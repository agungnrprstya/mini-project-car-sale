# Security Setup Guide

This project protects user data with Firebase security rules. The React
route guards (`AdminRoute`, `AuthorizedRoute`) only hide the UI — the
Firestore/Storage rules below are the real enforcement.

## 1. Apply Firestore Rules

1. Open the [Firebase Console](https://console.firebase.google.com/) and select this project.
2. Go to **Firestore Database → Rules**.
3. Open `firestore.rules` in this repo, paste the contents into the
   console, and click **Publish**. No edits needed — admin membership is
   data, not rules.
4. **First-time only (migration):** before publishing these rules, seed
   the `admins` collection with your current admin UIDs:
   Firestore Database → **+ Start collection** → `admins` → **Add
   document** → set the document ID to the admin's **User UID** (Firebase
   Console → Authentication → Users → copy **User UID**) and add a field
   `uid` with the same value. Do this for every existing admin, or they
   lose access the moment the new rules go live.

## 2. Add / remove admins (no code, no rule edits)

Admins are stored in the `admins` collection (document ID = auth UID):

- **App:** sign in as an admin, open **List Admin** in the dashboard
  sidebar, paste a UID, click **Add Admin**. Delete via the row action.
- **Console:** Firestore Database → `admins` → Add document / delete
  document.

The rules check `exists(.../admins/<uid>)` on every request, so changes
take effect immediately. No redeploy, no `.env` edits.

## 3. Set up Cloudinary (product images)

Firebase Storage is not available on the free (Spark) plan, so product
images are hosted on Cloudinary instead.

1. Create a free account at [cloudinary.com](https://cloudinary.com/).
2. Dashboard → **Settings → Upload → Upload presets → Add upload preset**.
3. Set **Signing Mode** to `Unsigned`, then save.
4. Copy the **preset name** and your **Cloud Name** (shown at the top of
   the Dashboard) into `.env`:

   ```
   REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```

5. Restart the dev server — CRA only reads `.env` at startup.

See `.env.example` for the full list of required variables.

## What the rules enforce

| Collection | Read | Write |
|---|---|---|
| `admins` | Admin only | Admin only |
| `products` | Public | Admin only |
| `profiles` (PII: name, email, phone, address) | Own profile or admin | Create own; update/delete admin only |
| `invoices` | Own invoices or admin | Create own; delete admin only |
| Anything else | Denied | Denied |

## About images

Product images are uploaded to Cloudinary, not Firebase Storage (Spark
plan no longer includes Storage). Legacy products whose `carImage` still
points at `appspot.com` are dead — `ProductImage` detects those URLs and
renders a placeholder instead. To fix a product, edit it in the dashboard
and upload a new image.

## Finding your admin UID

Firebase Console → Authentication → Users → click a user → copy **User UID**.

## Note on the client-side admin check

`src/hooks/useIsAdmin.js` reads the `admins` list from the Redux store
and compares `auth.currentUser.uid` against it. This gates the admin UI
only. Even if someone forges the cookie to reveal admin pages, every
Firestore/Storage request is still rejected by the rules above unless
they are signed in as a real admin.

## Rotating the exposed Firebase web config (recommended)

The `.env` file with the Firebase web config was committed to git history
in earlier commits and is visible on the remote. Web API keys are public
by design, but as good hygiene:

1. Firebase Console → Project Settings → General → Web API key → rotate.
2. Update `.env` locally and redeploy.

For a stronger long-term setup, switch admin detection to Firebase
[custom claims](https://firebase.google.com/docs/auth/admin/custom-claims)
set via the Admin SDK, and read them in the rules with
`request.auth.token.admin == true` instead of the `admins` collection.
