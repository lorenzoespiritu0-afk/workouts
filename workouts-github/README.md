# Workouts

A free, private workout tracker for running, riding, hiking, lifting, bouldering and hangboarding. It installs from the web like an app. There's no App Store, no account and no server, and it works offline once installed.

**Open the app:** https://lorenzoespiritu0-afk.github.io/workouts/workouts-github/

Your workouts are never uploaded anywhere. They stay on your own phone, in storage for this site only. Nobody else can see them, including whoever runs this repository.

---

## Install on iPhone

1. Open the link above in **Safari**. Other browsers on iPhone can't install it.
2. Tap the **Share** button, the square with an arrow pointing up.
3. Scroll down and tap **Add to Home Screen**, then **Add**.
4. Open Workouts from the new Home Screen icon. It runs full screen, like a normal app.

Always open it from the Home Screen icon, not from Safari. Safari can clear data for websites you haven't visited in a while, but Home Screen apps keep their data.

## Install on Android

1. Open the link above in **Chrome**.
2. Tap **Install app** if Chrome offers it. If it doesn't, tap the **⋮** menu at the top right, then **Add to Home screen** or **Install app**.
3. Tap **Install**.
4. Open Workouts from the new icon on your home screen or in your app drawer.

Samsung Internet works too: open the menu, then tap **Add page to**, then **Home screen**.

## First time you open it

- The app asks about your goals and how you train. You can skip this and do it later from **Coach**.
- Open **Settings** (the gear icon) and fill in your weight, height, age and max heart rate. Pace zones, watts per kg, VO2max and the fuel and hydration advice all use these.
- Add your gyms, crags and running routes under **Places**. Climbing gyms can each have their own color circuit.

## Using it

- **Log a workout:** tap **+**. You can type in stats from your watch or another app, or import a **GPX** or **TCX** file to get the map, splits and best efforts.
- **Start a workout:** tap **+**, then **Start a workout**. Pick your time, effort and how you feel, and it builds today's session. It then runs a live timer and checklist.
- **Chase a target:** tap **+**, then **🎯 Chase a target**. Set a finish time, pace, PR, lift, grade or hang. The app says how realistic the target is and builds a pacing plan for the attempt.
- **Events:** add a race or trip in **Coach**, then **Goals**, and you get a day-by-day plan up to race day.
- **Share images:** open any workout, then tap **Share as image**. You get a transparent PNG for Instagram Stories, with your choice of colors (Strava orange included), and the route and text can be different colors.

## Back up your data (important)

Your data lives only on your phone. If you delete the app, clear browser data or lose the phone, it's gone unless you have a backup.

- **Settings → Save backup file** every week or two. Keep the file in iCloud Drive, Google Drive or Files.
- To restore, or to move to a new phone: **Settings → Load file**.
- **Export CSV** gives you a spreadsheet of all your workouts.

The app reminds you when your last backup is more than two weeks old.

## Getting updates

When a new version is uploaded, close the app completely and open it again. Do this twice: the first time downloads the update, and the second time loads it. Your workouts stay where they are.

- **iPhone:** swipe up from the bottom and hold, then swipe the app away.
- **Android:** open recent apps and swipe it away.

## Troubleshooting

- **The app shows an old version:** close it and reopen it twice. If that doesn't work, wait 5 minutes, because GitHub can take a moment to publish.
- **The map isn't showing:** maps need an internet connection. Routes still draw as a line when you're offline.
- **The data disappeared on iPhone:** this happens if you opened the app in Safari instead of from the Home Screen icon. Each one keeps its own separate storage. Use the icon, and restore from your backup file.
- **Sharing an image does nothing:** press and hold the preview image, then choose **Save to Photos** (iPhone) or **Download image** (Android).

---

### For the maintainer: updating the app

1. Go to **Add file**, then **Upload files**, in the `workouts-github` folder.
2. Drag in the new `index.html` and `sw.js`.
3. Tap **Commit changes**.

Each update bumps the version number in `sw.js`, which is what tells phones to download the new version.
