# Workouts: GitHub Pages version

This is the offline version of your workout app. GitHub hosts it for free, it opens with no internet once installed, and routes show on real OpenStreetMap maps when you're online.

Your workout data is never uploaded to GitHub. It stays on your phone, in the browser's storage for this site.

## 1. Unzip

On iPhone, open the Files app and tap the zip file. A folder appears next to it with these files:

- index.html
- manifest.webmanifest
- sw.js
- icon-180.png, icon-192.png, icon-512.png
- README.md (this guide)

## 2. Create a GitHub account

Go to github.com in Safari and sign up. The free plan is all you need.

## 3. Make a repository

1. Tap the + at the top, then **New repository**.
2. Name it `workouts`.
3. Set it to **Public**. GitHub Pages is free for public repositories. Only the app's code is public; your data is not in it.
4. Tap **Create repository**.

## 4. Upload the files

1. On the new repository page, tap **uploading an existing file**. If you don't see it, use **Add file**, then **Upload files**. On iPhone you may need to switch Safari to the desktop site with the "aA" menu.
2. Select all the files from the unzipped folder.
3. Tap **Commit changes**.

## 5. Turn on GitHub Pages

1. In the repository, open **Settings**, then **Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Pick the branch **main** and the folder **/ (root)**, then **Save**.
4. Wait a minute or two. The page shows your link, which looks like `https://YOUR-USERNAME.github.io/workouts/`.

## 6. Install it on your iPhone

1. Open your link in **Safari**.
2. Tap **Share**, then **Add to Home Screen**.
3. Always open the app from the Home Screen icon. Safari can clear storage for websites you don't visit for a while, but Home Screen apps are kept.

## 7. Move your data over

1. In the claude.ai version, open **Settings**, then **Copy backup**.
2. In the new app, open **Settings**, paste into the backup box, and tap **Restore**.

Workouts, places, segments, goals, events, plans, gear, routines, and settings all come across. Photos stay on the device and version they were added in.

## Keeping your data safe

There's no cloud sync in this version, so copy a backup from Settings into Notes every week or two. **Export CSV** is there too if you want a spreadsheet.

## Updating later

When you get a new version, upload the new `index.html` to the repository and replace the old one. If the app still shows the old version, close it fully and open it again twice.
