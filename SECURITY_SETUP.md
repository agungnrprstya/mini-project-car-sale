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

## 2. Apply Storage Rules

1. Go to **Storage → Rules**.
2. Do the same `ADMIN_UID_1` / `ADMIN_UID_2` replacement using
   `storage.rules` from this repo.
3. Paste and **Publish**.

## What the rules enforce

| Collection | Read | Write |
|---|---|---|
| `products` | Public | Admin only |
| `profiles` (PII: name, email, phone, address) | Own profile or admin | Create own; update/delete admin only |
| `invoices` | Own invoices or admin | Create own; delete admin only |
| Anything else | Denied | Denied |

Storage: `carImage/*` is publicly readable (catalog images), uploads are
admin only.

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
