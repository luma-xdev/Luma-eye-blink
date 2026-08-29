👁️ Live Eye Music

A 9:16 live eye animation and music visualizer for GitHub Pages.

Features

- 9:16 vertical layout
- Animated eye
- Automatic blinking
- Iris movement
- Pupil movement
- Neon glow
- Zoom effect
- Song search
- Synced lyrics when available
- Play / Pause
- Mute / Unmute
- Fullscreen
- Mobile friendly
- GitHub Pages compatible

Project Structure

github-eye-blink/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
│
└── assets/
    └── music.mp3

Files

index.html

Main webpage of the project.

style.css

Controls the complete design, layout, colors, glow, lyrics and mobile interface.

script.js

Controls the eye animation, blinking, iris movement, song search and lyrics synchronization.

Do not change "script.js" if you are using the provided version.

.nojekyll

This file must remain empty.

assets/music.mp3

Optional audio file.

Use only audio that you own, have permission to use, or are properly licensed to use.

Lyrics

The project uses LRCLIB for available lyrics and synchronized lyrics.

When synchronized lyrics are available, the lyrics automatically change according to the audio time.

Example:

[00:05.20] First line
[00:08.40] Second line
[00:11.70] Third line

Eye Animation

The eye is generated in real time using HTML Canvas and JavaScript.

No eye video is required.

The animation includes:

- Eye opening
- Eye closing
- Full blinking
- Iris movement
- Pupil movement
- Reflection
- Glow
- Cinematic zoom

Audio

The current JavaScript expects the local audio file at:

assets/music.mp3

Do not download and redistribute copyrighted music without permission.

GitHub Pages Setup

1. Create a GitHub repository.

2. Upload:

index.html
style.css
script.js
README.md
.nojekyll

3. Create an "assets" folder.

4. If using authorized audio, upload:

assets/music.mp3

5. Open:

Settings → Pages

6. Under Build and deployment select:

Deploy from a branch

7. Select:

Branch: main
Folder: / (root)

8. Click:

Save

Website URL

After GitHub Pages is enabled, the website will be available at:

https://YOUR-USERNAME.github.io/github-eye-blink/

Replace "YOUR-USERNAME" with your GitHub username.

Important

GitHub Pages is a static hosting service.

Python is not required to run this project.

The animation runs directly inside the visitor's browser using:

HTML
CSS
JavaScript
Canvas

The browser generates the eye animation in real time.

Mobile Audio

Mobile browsers may block automatic audio playback until the user interacts with the page.

The user may need to tap the Play button or select a song before audio starts.

Final Structure

github-eye-blink/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
│
└── assets/
    └── music.mp3

License

Use this project code for your own projects, subject to the licenses and terms of any external services, music, lyrics, images, or other content used with it.
