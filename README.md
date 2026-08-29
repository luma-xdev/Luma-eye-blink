# Coded Eye Blink — GitHub Pages

A complete static **9:16 live eye animation** made with only HTML, CSS and JavaScript.

## What it does

- Renders the animation live in the browser — no MP4 is required.
- Uses HTML Canvas for the eye.
- Creates a procedural eye with iris, pupil, reflections and eyelids.
- Upper and lower eyelids move to create a full blink.
- Blink timing is randomized so it does not look like a fixed GIF.
- Adds subtle pupil movement.
- Adds cinematic blue glow.
- Adds slow camera zoom/sway.
- Optional music.
- Play / Pause, Mute and Fullscreen buttons.
- Works as a static GitHub Pages site.

## Files

```text
github-eye-blink/
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
├── .github/
│   └── workflows/
│       └── pages.yml
└── assets/
    └── music.mp3        # optional
```

## Important: no video upload

You do **not** upload an MP4.

The browser executes `script.js` and draws every frame on a `<canvas>`. The eye is generated from shapes and gradients, and the eyelids are animated over the eye.

That means:

```text
GitHub Pages
     ↓
index.html
     ↓
script.js
     ↓
Canvas renders eye
     ↓
Eyelids animate
     ↓
Live blink
```

## 1. Create the GitHub repository

Create a new GitHub repository, for example:

```text
github-eye-blink
```

Public is simplest for GitHub Pages.

Upload all project files while keeping the same folder structure.

## 2. Optional music

Put your music file here:

```text
assets/music.mp3
```

The supplied project already references this filename.

If you do not want music, you can remove the `<audio>` element from `index.html` and the music-related JavaScript, or simply leave the file missing; the animation still works.

Because browsers restrict automatic audio playback, press **Play** once to start sound.

## 3. Enable GitHub Pages

On GitHub:

1. Open your repository.
2. Open **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.

The included workflow:

```text
.github/workflows/pages.yml
```

publishes the repository to GitHub Pages.

Your site will look like:

```text
https://YOUR-USERNAME.github.io/github-eye-blink/
```

## 4. How the blink works

The important function is:

```javascript
blinkAmount(t)
```

It produces four stages:

```text
OPEN
  ↓
CLOSING
  ↓
FULLY CLOSED
  ↓
OPENING
  ↓
OPEN
```

The upper and lower eyelid masks move independently, so the animation is not just changing the iris.

## 5. Change blink frequency

In `script.js`:

```javascript
const CONFIG = {
  blinkMin: 2.2,
  blinkMax: 5.0
};
```

For slower blinking:

```javascript
blinkMin: 4,
blinkMax: 8
```

For faster blinking:

```javascript
blinkMin: 1.5,
blinkMax: 3.5
```

## 6. Change the visual style

In `CONFIG`:

```javascript
irisColor: [65, 190, 255]
```

The current drawing uses a blue/cyan futuristic style.

You can also change the colors directly in `drawEye()`.

## 7. Replace the procedural eye with a real photo later

This version is intentionally **100% static and code-generated** so you do not need to upload a photo.

If you later want a photorealistic version based on a specific person's/character's eye, a better architecture is to use a prepared eye image and separate eyelid/skin masks. The same Canvas animation system can then animate those layers.

## 8. GitHub Pages limitations

GitHub Pages is static hosting.

It can run:

- HTML
- CSS
- JavaScript
- Canvas
- Web Audio / normal browser audio

It cannot continuously run a Python process on the Pages server.

For this project, that is not a problem because the animation is rendered by JavaScript **inside the visitor's browser**.

## 9. Performance

The animation uses Canvas and is designed for phones.

If an older phone struggles, reduce the device-pixel-ratio cap in:

```javascript
const dpr = Math.min(window.devicePixelRatio || 1, 2);
```

to:

```javascript
const dpr = 1;
```

This lowers rendering cost.

## 10. Can it be a real Android Live Wallpaper?

This GitHub project is a **live web animation**, not an Android system Live Wallpaper.

For an actual Android home-screen wallpaper, the next step would be an Android `WallpaperService` / Canvas or OpenGL application.

## License

You can modify the project for your own use.
