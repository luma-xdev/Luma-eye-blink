/* =====================================================
   LUMA XDEV
   STATIC SONG + EYE VISUALIZER

   No online song search.
   No random extra songs.

   Only songs written inside SONGS array are shown.
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const app =
    document.querySelector(".app");

const canvas =
    document.getElementById("eyeCanvas");

const ctx =
    canvas.getContext("2d");

const songList =
    document.getElementById("songList");

const audio =
    document.getElementById("audio");

const lyricText =
    document.getElementById("lyricText");

const playButton =
    document.getElementById("playButton");

const muteButton =
    document.getElementById("muteButton");

const progressBar =
    document.getElementById("progressBar");


/* =====================================================
   SONG LIST

   IMPORTANT:
   Only these songs appear on the page.

   Change the names/artists if you want.

   Audio files must be inside:

   assets/

   Example:

   assets/song1.mp3
   assets/song2.mp3
===================================================== */

const SONGS = [

    {
        id: 1,
        title: "Shape of You",
        artist: "Ed Sheeran",
        audio: "assets/song1.mp3",
        lyrics: [
            { time: 0, text: "Shape of You" },
            { time: 10, text: "Ed Sheeran" }
        ]
    },

    {
        id: 2,
        title: "Starboy",
        artist: "The Weeknd ft. Daft Punk",
        audio: "assets/song2.mp3",
        lyrics: [
            { time: 0, text: "Starboy" },
            { time: 10, text: "The Weeknd ft. Daft Punk" }
        ]
    },

    {
        id: 3,
        title: "Love Me Like You Do",
        artist: "Ellie Goulding",
        audio: "assets/song3.mp3",
        lyrics: [
            { time: 0, text: "Love Me Like You Do" },
            { time: 10, text: "Ellie Goulding" }
        ]
    },

    {
        id: 4,
        title: "Hurts So Good",
        artist: "Astrid S.",
        audio: "assets/song4.mp3",
        lyrics: [
            { time: 0, text: "Hurts So Good" },
            { time: 10, text: "Astrid S." }
        ]
    },

    {
        id: 5,
        title: "Tera Mera Rishta - New Version",
        artist: "Emraan Hashmi",
        audio: "assets/song5.mp3",
        lyrics: [
            { time: 0, text: "Tera Mera Rishta" },
            { time: 10, text: "New Version" }
        ]
    },

    {
        id: 6,
        title: "Dancing With Your Ghost",
        artist: "Sasha Sloan",
        audio: "assets/song6.mp3",
        lyrics: [
            { time: 0, text: "Dancing With Your Ghost" },
            { time: 10, text: "Sasha Sloan" }
        ]
    },

    {
        id: 7,
        title: "Him & I",
        artist: "G-Eazy & Halsey",
        audio: "assets/song7.mp3",
        lyrics: [
            { time: 0, text: "Him & I" },
            { time: 10, text: "G-Eazy & Halsey" }
        ]
    },

    {
        id: 8,
        title: "PAIN - Party In My Head",
        artist: "PAIN",
        audio: "assets/song8.mp3",
        lyrics: [
            { time: 0, text: "Party In My Head" },
            { time: 10, text: "PAIN" }
        ]
    },

    {
        id: 9,
        title: "We Are Still Here - Live",
        artist: "Live",
        audio: "assets/song9.mp3",
        lyrics: [
            { time: 0, text: "We Are Still Here" },
            { time: 10, text: "Live" }
        ]
    },

    {
        id: 10,
        title: "Only Love Can Hurt Like This",
        artist: "Paloma Faith",
        audio: "assets/song10.mp3",
        lyrics: [
            { time: 0, text: "Only Love Can Hurt Like This" },
            { time: 10, text: "Paloma Faith" }
        ]
    },

    {
        id: 11,
        title: "Iron Heart 2026",
        artist: "M-aslale",
        audio: "assets/song11.mp3",
        lyrics: [
            { time: 0, text: "Iron Heart 2026" },
            { time: 10, text: "M-aslale" }
        ]
    }

];

    {
    
                time: 10,
                text: "STAY STRONG"
            },

            {
                time: 15,
                text: "FOLLOW YOUR PATH"
            },

            {
                time: 20,
                text: "LIGHT UP THE NIGHT"
            },

            {
                time: 25,
                text: "IRON HEART"
            }

        ]

    },


    {
        id: 4,

        title: "We Are Still Here",

        artist: "Song • Paul Werner",

        audio: "assets/song4.mp3",

        lyrics: [

            {
                time: 0,
                text: "WE ARE STILL HERE"
            },

            {
                time: 5,
                text: "WE KEEP GOING"
            },

            {
                time: 10,
                text: "THROUGH THE NIGHT"
            },

            {
                time: 15,
                text: "WE FIND THE LIGHT"
            },

            {
                time: 20,
                text: "WE ARE STILL HERE"
            },

            {
                time: 26,
                text: "STAY WITH US"
            }

        ]

    },


    {
        id: 5,

        title: "The Pain In My Heart",

        artist: "Song • Nightcore",

        audio: "assets/song5.mp3",

        lyrics: [

            {
                time: 0,
                text: "THE PAIN"
            },

            {
                time: 5,
                text: "IN MY HEART"
            },

            {
                time: 10,
                text: "FADES INTO LIGHT"
            },

            {
                time: 15,
                text: "I KEEP MOVING"
            },

            {
                time: 20,
                text: "I KEEP BREATHING"
            },

            {
                time: 25,
                text: "I KEEP GOING"
            }

        ]

    },


    {
        id: 6,

        title: "id anxiety",

        artist: "Playlist",

        audio: "assets/song6.mp3",

        lyrics: [

            {
                time: 0,
                text: "BREATHE"
            },

            {
                time: 5,
                text: "LOOK AHEAD"
            },

            {
                time: 10,
                text: "KEEP MOVING"
            },

            {
                time: 15,
                text: "YOU ARE NOT ALONE"
            },

            {
                time: 20,
                text: "KEEP THE LIGHT"
            },

            {
                time: 26,
                text: "BREATHE"
            }

        ]

    },


    {
        id: 7,

        title: "Iron Heart, Pt. 2",

        artist: "Song • Devestation Spencer",

        audio: "assets/song7.mp3",

        lyrics: [

            {
                time: 0,
                text: "IRON HEART"
            },

            {
                time: 5,
                text: "PART TWO"
            },

            {
                time: 10,
                text: "THE NIGHT IS YOUNG"
            },

            {
                time: 15,
                text: "KEEP THE FIRE"
            },

            {
                time: 20,
                text: "NEVER GIVE UP"
            },

            {
                time: 26,
                text: "IRON HEART"
            }

        ]

    },


    {
        id: 8,

        title: "MEMORII",

        artist: "Artist",

        audio: "assets/song8.mp3",

        lyrics: [

            {
                time: 0,
                text: "MEMORIES"
            },

            {
                time: 5,
                text: "LIGHT IN THE DARK"
            },

            {
                time: 10,
                text: "TIME MOVES ON"
            },

            {
                time: 15,
                text: "KEEP THE MEMORY"
            },

            {
                time: 22,
                text: "MEMORII"
            }

        ]

    },


    {
        id: 9,

        title: "Come Inside",

        artist: "Song • Memoirs",

        audio: "assets/song9.mp3",

        lyrics: [

            {
                time: 0,
                text: "COME INSIDE"
            },

            {
                time: 5,
                text: "FOLLOW THE LIGHT"
            },

            {
                time: 10,
                text: "OPEN YOUR EYES"
            },

            {
                time: 15,
                text: "SEE THE FUTURE"
            },

            {
                time: 20,
                text: "COME INSIDE"
            },

            {
                time: 27,
                text: "CIPHER STACK"
            }

        ]

    },


    {
        id: 10,

        title: "We Are Still Here - REMIX",

        artist: "Song • Paul Werner",

        audio: "assets/song10.mp3",

        lyrics: [

            {
                time: 0,
                text: "WE ARE STILL HERE"
            },

            {
                time: 5,
                text: "THIS IS THE REMIX"
            },

            {
                time: 10,
                text: "FEEL THE ENERGY"
            },

            {
                time: 15,
                text: "MOVE WITH THE LIGHT"
            },

            {
                time: 20,
                text: "KEEP GOING"
            },


/* =====================================================
   STATE
===================================================== */

let selectedSong = null;

let currentLyrics = [];

let blinkStart = -1;

let nextBlink =
    2.5 +
    Math.random() * 3;

let eyeTime = 0;

let mouseX = 0;

let mouseY = 0;


/* =====================================================
   CANVAS RESIZE
===================================================== */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    canvas.width =
        Math.floor(
            rect.width * dpr
        );

    canvas.height =
        Math.floor(
            rect.height * dpr
        );

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =====================================================
   CREATE SONG LIST
===================================================== */

function createSongList() {

    songList.innerHTML = "";

    SONGS.forEach(
        function(song) {

            const item =
                document.createElement("div");

            item.className =
                "song";


            item.dataset.id =
                song.id;


            const cover =
                document.createElement("img");

            cover.className =
                "song-cover";


            cover.src =
                createCover(
                    song.title,
                    song.id
                );


            const info =
                document.createElement("div");

            info.className =
                "song-info";


            const title =
                document.createElement("div");

            title.className =
                "song-name";


            title.textContent =
                song.title;


            const artist =
                document.createElement("div");

            artist.className =
                "song-artist";


            artist.textContent =
                song.artist;


            info.appendChild(title);

            info.appendChild(artist);


            const equalizer =
                document.createElement("div");

            equalizer.className =
                "equalizer";


            for (
                let i = 0;
                i < 4;
                i++
            ) {

                const bar =
                    document.createElement("span");

                equalizer.appendChild(bar);

            }


            item.appendChild(cover);

            item.appendChild(info);

            item.appendChild(equalizer);


            item.addEventListener(
                "click",
                function() {

                    selectSong(song);

                }
            );


            songList.appendChild(item);

        }
    );

}


/* =====================================================
   GENERATED COVER ART

   No external images required.
===================================================== */

function createCover(title, id) {

    const letters =
        title
            .substring(0, 2)
            .toUpperCase();


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
        >

            <rect
                width="100"
                height="100"
                fill="#071522"
            />

            <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#20bfff"
                stroke-width="4"
                opacity=".65"
            />

            <circle
                cx="50"
                cy="50"
                r="17"
                fill="#00aaff"
                opacity=".22"
            />

            <text
                x="50"
                y="57"
                text-anchor="middle"
                fill="white"
                font-family="Arial"
                font-weight="bold"
                font-size="22"
            >
                ${letters}
            </text>

        </svg>

    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


/* =====================================================
   SELECT SONG
===================================================== */

async function selectSong(song) {

    selectedSong =
        song;

    currentLyrics =
        song.lyrics || [];


    /* Update active UI */

    document
        .querySelectorAll(".song")
        .forEach(
            function(item) {

                item.classList.toggle(
                    "active",
                    Number(item.dataset.id)
                    ===
                    song.id
                );

            }
        );


    /* Load audio */

    audio.pause();

    audio.currentTime = 0;

    audio.src =
        song.audio;

    audio.load();


    lyricText.textContent =
        currentLyrics.length
            ?
        currentLyrics[0].text
            :
        "";


    progressBar.style.width =
        "0%";


    /* Try automatic playback */

    try {

        await audio.play();

        playButton.textContent =
            "❚❚";

    }

    catch {

        playButton.textContent =
            "▶";

    }

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

playButton.addEventListener(
    "click",
    async function() {

        if (!selectedSong) {

            selectSong(
                SONGS[0]
            );

            return;

        }


        if (audio.paused) {

            try {

                await audio.play();

            }

            catch {

                return;

            }

        }

        else {

            audio.pause();

        }

    }
);


audio.addEventListener(
    "play",
    function() {

        playButton.textContent =
            "❚❚";

    }
);


audio.addEventListener(
    "pause",
    function() {

        playButton.textContent =
            "▶";

    }
);


/* =====================================================
   MUTE
===================================================== */

muteButton.addEventListener(
    "click",
    function() {

        audio.muted =
            !audio.muted;


        muteButton.textContent =
            audio.muted
                ?
            "🔇"
                :
            "🔊";

    }
);


/* =====================================================
   PROGRESS
===================================================== */

audio.addEventListener(
    "timeupdate",
    function() {

        if (
            !audio.duration
        ) {

            return;

        }


        const percentage =
            (
                audio.currentTime /
                audio.duration
            )
            *
            100;


        progressBar.style.width =
            percentage +
            "%";


        updateLyrics();

    }
);


/* =====================================================
   LYRICS SYNC
===================================================== */

function updateLyrics() {

    if (
        !currentLyrics.length
    ) {

        return;

    }


    const time =
        audio.currentTime;


    let activeIndex = 0;


    for (
        let i = 0;
        i < currentLyrics.length;
        i++
    ) {

        if (
            currentLyrics[i].time
            <=
            time
        ) {

            activeIndex =
                i;

        }

    }


    lyricText.textContent =
        currentLyrics[
            activeIndex
        ].text;

}


/* =====================================================
   CANVAS HELPERS
===================================================== */

function random(min, max) {

    return (
        min +
        Math.random() *
        (max - min)
    );

}


function smoothstep(x) {

    x =
        Math.max(
            0,
            Math.min(
                1,
                x
            )
        );

    return (
        x *
        x *
        (3 - 2 * x)
    );

}


/* =====================================================
   BLINK
===================================================== */

function getBlinkAmount(time) {

    if (
        blinkStart < 0
    ) {

        if (
            time >= nextBlink
        ) {

            blinkStart =
                time;

        }

        else {

            return 0;

        }

    }


    const d =
        time -
        blinkStart;


    const closeTime =
        0.13;


    const holdTime =
        0.055;


    const openTime =
        0.18;


    if (
        d < closeTime
    ) {

        return smoothstep(
            d /
            closeTime
        );

    }


    if (
        d <
        closeTime +
        holdTime
    ) {

        return 1;

    }


    const openProgress =

        (
            d -
            closeTime -
            holdTime
        )
        /
        openTime;


    if (
        openProgress <
        1
    ) {

        return (
            1 -
            smoothstep(
                openProgress
            )
        );

    }


    blinkStart =
        -1;


    nextBlink =
        time +
        random(
            2.5,
            5.5
        );


    return 0;

}


/* =====================================================
   DRAW BACKGROUND
===================================================== */

function drawBackground(W, H) {

    const gradient =
        ctx.createRadialGradient(
            W * .65,
            H * .38,
            0,
            W * .65,
            H * .38,
            W * .8
        );


    gradient.addColorStop(
        0,
        "#0b3553"
    );


    gradient.addColorStop(
        .35,
        "#061827"
    );


    gradient.addColorStop(
        1,
        "#010307"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    /* Blue glow */

    const glow =
        ctx.createRadialGradient(
            W * .72,
            H * .38,
            0,
            W * .72,
            H * .38,
            W * .5
        );


    glow.addColorStop(
        0,
        "rgba(0,180,255,.20)"
    );


    glow.addColorStop(
        .5,
        "rgba(0,90,255,.06)"
    );


    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        glow;


    ctx.fillRect(
        0,
        0,
        W,
        H
    );

}


/* =====================================================
   DRAW EYE
===================================================== */

function drawEye(time) {

    const W =
        canvas.width;

    const H =
        canvas.height;


    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    drawBackground(
        W,
        H
    );


    /* Camera */

    const zoom =
        1 +
        Math.sin(
            time * .5
        )
        *
        .025;


    const cx =
        W * .68;


    const cy =
        H * .37;


    ctx.save();


    ctx.translate(
        cx,
        cy
    );


    ctx.scale(
        zoom,
        zoom
    );


    ctx.translate(
        -cx,
        -cy
    );


    /* =============================================
       EYE SIZE
    ============================================= */

    const eyeX =
        cx;


    const eyeY =
        cy;


    const rx =
        W * .31;


    const ry =
        H * .075;


    /* =============================================
       OUTER GLOW
    ============================================= */

    ctx.save();

    ctx.filter =
        "blur(18px)";

    ctx.fillStyle =
        "rgba(0,190,255,.25)";


    ctx.beginPath();


    ctx.ellipse(
        eyeX,
        eyeY,
        rx * 1.05,
        ry * 1.2,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();

    ctx.restore();


    /* =============================================
       EYE WHITE
    ============================================= */

    ctx.beginPath();


    ctx.moveTo(
        eyeX - rx,
        eyeY
    );


    ctx.quadraticCurveTo(
        eyeX - rx * .5,
        eyeY - ry,
        eyeX,
        eyeY - ry
    );


    ctx.quadraticCurveTo(
        eyeX + rx * .5,
        eyeY - ry,
        eyeX + rx,
        eyeY
    );


    ctx.quadraticCurveTo(
        eyeX + rx * .5,
        eyeY + ry,
        eyeX,
        eyeY + ry
    );


    ctx.quadraticCurveTo(
        eyeX - rx * .5,
        eyeY + ry,
        eyeX - rx,
        eyeY
    );


    ctx.closePath();


    const white =
        ctx.createLinearGradient(
            eyeX,
            eyeY - ry,
            eyeX,
            eyeY + ry
        );


    white.addColorStop(
        0,
        "#e9fbff"
    );


    white.addColorStop(
        .5,
        "#91aeb9"
    );


    white.addColorStop(
        1,
        "#263f4b"
    );


    ctx.fillStyle =
        white;


    ctx.fill();


    /* =============================================
       IRIS
    ============================================= */

    const irisX =
        eyeX +
        Math.sin(
            time * .65
        )
        *
        rx *
        .07;


    const irisY =
        eyeY +
        Math.cos(
            time * .48
        )
        *
        ry *
        .12;


    const irisRadius =
        ry * 1.02;


    const iris =
        ctx.createRadialGradient(
            irisX -
            irisRadius * .25,
            irisY -
            irisRadius * .25,
            irisRadius * .05,
            irisX,
            irisY,
            irisRadius
        );


    iris.addColorStop(
        0,
        "#eaffff"
    );


    iris.addColorStop(
        .15,
        "#50eaff"
    );


    iris.addColorStop(
        .42,
        "#008ecb"
    );


    iris.addColorStop(
        .72,
        "#003c63"
    );


    iris.addColorStop(
        1,
        "#00111e"
    );


    ctx.save();

    ctx.shadowColor =
        "#00cfff";

    ctx.shadowBlur =
        18;


    ctx.fillStyle =
        iris;


    ctx.beginPath();


    ctx.arc(
        irisX,
        irisY,
        irisRadius,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.restore();


    /* =============================================
       PUPIL
    ============================================= */

    ctx.fillStyle =
        "#000207";


    ctx.beginPath();


    ctx.arc(
        irisX,
        irisY,
        irisRadius * .36,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /* =============================================
       REFLECTION
    ============================================= */

    ctx.fillStyle =
        "rgba(255,255,255,.95)";


    ctx.beginPath();


    ctx.arc(
        irisX -
        irisRadius * .25,
        irisY -
        irisRadius * .28,
        irisRadius * .12,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /* =============================================
       BLINK
    ============================================= */

    const blink =
        getBlinkAmount(
            time
        );


    /* Upper eyelid */

    ctx.fillStyle =
        "#02070c";


    ctx.beginPath();


    ctx.moveTo(
        eyeX - rx * 1.12,
        eyeY
    );


    ctx.quadraticCurveTo(
        eyeX - rx * .55,
        eyeY -
        ry *
        (2 - blink),
        eyeX,
        eyeY -
        ry *
        (2 - blink)
    );


    ctx.quadraticCurveTo(
        eyeX + rx * .55,
        eyeY -
        ry *
        (2 - blink),
        eyeX + rx * 1.12,
        eyeY
    );


    ctx.lineTo(
        W,
        0
    );


    ctx.lineTo(
        0,
        0
    );


    ctx.closePath();


    ctx.fill();


    /* Lower eyelid */

    ctx.beginPath();


    ctx.moveTo(
        eyeX - rx * 1.12,
        eyeY
    );


    ctx.quadraticCurveTo(
        eyeX - rx * .55,
        eyeY +
        ry *
        (2 - blink * .82),
        eyeX,
        eyeY +
        ry *
        (2 - blink * .82)
    );


    ctx.quadraticCurveTo(
        eyeX + rx * .55,
        eyeY +
        ry *
        (2 - blink * .82),
        eyeX + rx * 1.12,
        eyeY
    );


    ctx.lineTo(
        W,
        H
    );


    ctx.lineTo(
        0,
        H
    );


    ctx.closePath();


    ctx.fill();


    /* =============================================
       EYELID GLOW EDGE
    ============================================= */

    ctx.strokeStyle =
        "rgba(55,210,255,.55)";


    ctx.lineWidth =
        Math.max(
            2,
            W * .008
        );


    ctx.beginPath();


    ctx.moveTo(
        eyeX - rx,
        eyeY
    );


    ctx.quadraticCurveTo(
        eyeX,
        eyeY -
        ry *
        (1 - blink),
        eyeX + rx,
        eyeY
    );


    ctx.stroke();


    ctx.restore();


    /* =============================================
       SCANLINES
    ============================================= */

    ctx.globalAlpha =
        .045;


    ctx.fillStyle =
        "#b9f4ff";


    for (
        let y = 0;
        y < H;
        y += 6
    ) {

        ctx.fillRect(
            0,
            y,
            W,
            1
        );

    }


    ctx.globalAlpha =
        1;

}


/* =====================================================
   ANIMATION
===================================================== */

function animate() {

    if (
        audio.duration &&
        !audio.paused
    ) {

        eyeTime =
            audio.currentTime;

    }

    else {

        eyeTime =
            performance.now()
            /
            1000;

    }


    drawEye(
        eyeTime
    );


    requestAnimationFrame(
        animate
    );

}


animate();


/* =====================================================
   INITIALIZE
===================================================== */

createSongList();


/* Automatically select first song */

selectSong(
    SONGS[0]
)
