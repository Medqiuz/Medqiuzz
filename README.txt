MEDQUIZ FIREBASE SECURE REGISTRATION PACKAGE
Project: medqiuzz

FILES
- firebase.js: Firebase app, Authentication and Firestore initialization.
- index.html: student registration and email/password login.
- auth.js: Firebase auth compatibility layer for the existing dashboard.
- firestore.rules: Firestore security rules.
- admin.html: private student list and CSV export.
- admin-codes.html: admin-only one-time access-code generator.
- DASHBOARD_PATCH.txt: exact edits needed in the existing Dashboard.html and script.js.

IMPORTANT SECURITY FACTS
1. Your previous access codes were published in a public GitHub repository and shared in chat. Treat every old code as compromised. Do not reuse them. Generate new 12-character codes with admin-codes.html.
2. The Firebase web API key in firebase.js is a client configuration value, not a password. Security comes from Authentication and Firestore Rules.
3. Never put a service-account JSON, private key, admin password, or private payment information in GitHub.
4. This package stores no student passwords in Firestore. Firebase Authentication manages them.
5. Students can read only their own student document. Only UIDs explicitly registered in the admins collection can list all student records or generate codes.
6. Access-code redemption uses a Firestore transaction. Rules require the code to be marked used and the student record to be created together.

SETUP (DO NOT SKIP ORDER)
A. Firebase Authentication
1. Open Firebase Console > Authentication > Get started.
2. Open Sign-in method / Sign-in providers.
3. Enable Email/Password and save.
4. In Authentication settings, add your live website's host/domain to Authorized domains. For GitHub Pages, add the hostname only (for example, OWNER.github.io). Confirm the exact hostname from your published website; do not guess it.

B. Firestore rules
1. Open Firestore Database > Rules.
2. Replace the rules with the entire content of firestore.rules.
3. Tap Publish.
4. Do not use Test mode or open rules such as allow read, write: if true.

C. Create your first administrator securely
1. In Firebase Console > Authentication > Users, tap Add user.
2. Create an admin account using an email you control and a strong unique password. This is not a student account.
3. Copy its UID from the Authentication Users table.
4. Open Firestore Database > Data. Create collection admins if it does not exist.
5. Create a document with Document ID exactly equal to the admin UID.
6. Add field role, type string, value admin. Save.
7. Do not give students access to this account or its password.

D. Add package files to the root of your GitHub Pages project
1. Replace existing firebase.js and index.html with the package versions.
2. Replace existing auth.js with the package version.
3. Replace your dashboard.html with the package version (the screenshot of your GitHub repository showed the lowercase filename).
4. Add admin.html and admin-codes.html.
5. Apply the edits in DASHBOARD_PATCH.txt to your existing script.js. Keep all your original navigation methods.
6. Keep your existing dashboard.js and other course navigation files. Fix any errors specific to those files separately.
7. Commit/push changes and wait for GitHub Pages to publish.

E. Generate fresh access codes
1. Open https://YOUR-LIVE-SITE/admin-codes.html (use your real published site address).
2. Sign in with your admin email/password.
3. Generate a small test batch first (e.g. 3 codes).
4. Download/copy the codes and keep them private. Each code can register one student once.
5. Give one new code to one student. Never post the full list publicly.

F. Test safely
1. Use one test code and a test email that you control to register.
2. Confirm the student profile appears in Firestore > students.
3. Try registering a second time with the same code; it must be rejected.
4. Open admin.html, sign in as admin, and confirm the test student appears.
5. Open admin.html while signed in as a normal student; access must be denied.

DATA STORED IN students/{Firebase UID}
fullName, phone, university, department, year, section, email, redeemedCode, registrationDate, uid.

NOT STORED
Student password. It is handled by Firebase Authentication.

COST NOTE
Firestore and Firebase Authentication have free-tier quotas, but usage limits and pricing can change. Monitor the Firebase billing/usage pages. This implementation does not require Cloud Functions.

TESTING LIMITATION
The files are written against the Firebase Web SDK modular APIs and security-rule patterns, but I cannot execute them against your live Firebase project from this chat. Publish the rules and test with a disposable account and a newly generated test code before giving real students access. If an error appears, send the exact error text and the file/line where it occurs.
