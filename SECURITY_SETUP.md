# Security Setup Guide

This project protects user data with Firebase security rules. The React
route guards (`AdminRoute`, `AuthorizedRoute`) only hide the UI — the
Firestore/Storage rules below are the real enforcement.

## 1. Apply Firestore Rules

1. Open the [Firebase Console](https://console.firebase.google.com/) and select this project.
2. Go to **Firestore Database → Rules**.
3. Open `firestore.rules` in this repo.
4. Replace `ADMIN_UID_1` and `ADMIN_UID_2` with the actual Firebase Auth
   UIDs of your admin accounts (the same values as `REACT_APP_ADMIN_ID_1`
   and `REACT_APP_ADMIN_ID_2` in your `.env`).
5. Paste the rules into the console and click **Publish**.

## 2. Set up Cloudinary (product images)

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

`src/utils/authentication.js` checks `auth.currentUser.uid` against the
admin UID list (with a cookie fallback while Firebase restores the session
on page load). This gates the admin UI only. Even if someone forges the
cookie to reveal admin pages, every Firestore/Storage request is still
rejected by the rules above unless they are signed in as the real admin.

## Rotating the exposed Firebase web config (recommended)

The `.env` file with the Firebase web config was committed to git history
in earlier commits and is visible on the remote. Web API keys are public
by design, but as good hygiene:

1. Firebase Console → Project Settings → General → Web API key → rotate.
2. Update `.env` locally and redeploy.

For a stronger long-term setup, switch admin detection to Firebase
[custom claims](https://firebase.google.com/docs/auth/admin/custom-claims)
set via the Admin SDK, and read them in the rules with
`request.auth.token.admin == true` instead of a hardcoded UID list.
