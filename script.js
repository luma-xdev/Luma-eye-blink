/* =====================================================
   LIVE EYE MUSIC PLAYER

   - Online song search
   - LRCLIB synced lyrics
   - Live Canvas eye
   - Full eyelid blink
   - Iris movement
   - Glow
   - Zoom
   - Lyrics synchronization
   ===================================================== */


/* ============================================
   ELEMENTS
============================================ */

const canvas =
    document.getElementById("eyeCanvas");

const ctx =
    canvas.getContext("2d");

const audio =
    document.getElementById("audio");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const results =
    document.getElementById("results");

const status =
    document.getElementById("status");

const songTitle =
    document.getElementById("songTitle");

const playButton =
    document.getElementById("playButton");

const muteButton =
    document.getElementById("muteButton");

const fullscreenButton =
    document.getElementById("fullscreenButton");

const visual =
    document.querySelector(".visual");

const previousLyric =
    document.querySelector(".previous");

const currentLyric =
    document.querySelector(".current");

const nextLyric =
    document.querySelector(".next");


/* ============================================
   CANVAS
============================================ */

let W = 1080;

let H = 1920;

function resizeCanvas() {

    const rect =
        visual.getBoundingClientRect();

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    W =
        Math.floor(
            rect.width * dpr
        );

    H =
        Math.floor(
            rect.height * dpr
        );

    canvas.width = W;

    canvas.height = H;

}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* ============================================
   STATE
============================================ */

let lyrics = [];

let currentSong = null;

let animationRunning = true;

let blinkStart = -1;

let nextBlink = 3;

let lastLyricIndex = -1;


/* ============================================
   RANDOM
============================================ */

function random(min, max) {

    return (
        min +
        Math.random() *
        (max - min)
    );

}


/* ============================================
   EASING
============================================ */

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


/* ============================================
   BLINK
============================================ */

const BLINK_CLOSE =
    0.13;

const BLINK_HOLD =
    0.055;

const BLINK_OPEN =
    0.18;


function getBlinkAmount(time) {

    if (blinkStart < 0) {

        if (time >= nextBlink) {

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


    if (
        d <
        BLINK_CLOSE
    ) {

        return smoothstep(
            d /
            BLINK_CLOSE
        );

    }


    if (
        d <
        BLINK_CLOSE +
        BLINK_HOLD
    ) {

        return 1;

    }


    const openingProgress =

        (
            d -
            BLINK_CLOSE -
            BLINK_HOLD
        )
        /
        BLINK_OPEN;


    if (
        openingProgress <
        1
    ) {

        return (

            1 -
            smoothstep(
                openingProgress
            )

        );

    }


    blinkStart =
        -1;


    nextBlink =
        time +
        random(
            2.2,
            5.0
        );


    return 0;

}


/* ============================================
   DRAW EYE
============================================ */

function drawEye(time) {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    const cx =
        W / 2;

    const cy =
        H * .40;


    /*
       Cinematic camera movement
    */

    const zoom =

        1 +
        Math.sin(
            time * .5
        )
        *
        .035;


    const moveX =

        Math.sin(
            time * .21
        )
        *
        W *
        .006;


    const moveY =

        Math.cos(
            time * .17
        )
        *
        H *
        .004;


    ctx.save();


    ctx.translate(
        cx + moveX,
        cy + moveY
    );


    ctx.scale(
        zoom,
        zoom
    );


    ctx.translate(
        -cx,
        -cy
    );


    /* ======================================
       BACKGROUND
    ====================================== */

    const bg =

        ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            W * .75
        );


    bg.addColorStop(
        0,
        "#102b42"
    );


    bg.addColorStop(
        .40,
        "#07121f"
    );


    bg.addColorStop(
        1,
        "#010307"
    );


    ctx.fillStyle =
        bg;


    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    /* ======================================
       BLUE GLOW
    ====================================== */

    const glow =

        ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            W * .45
        );


    glow.addColorStop(
        0,
        "rgba(0,200,255,.20)"
    );


    glow.addColorStop(
        .45,
        "rgba(0,100,255,.08)"
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


    /* ======================================
       EYE SIZE
    ====================================== */

    const eyeX =
        cx;

    const eyeY =
        H * .39;

    const rx =
        W * .365;

    const ry =
        H * .105;


    /* ======================================
       EYE OUTER GLOW
    ====================================== */

    ctx.save();

    ctx.filter =
        "blur(24px)";

    ctx.fillStyle =
        "rgba(0,190,255,.28)";


    ctx.beginPath();

    ctx.ellipse(
        eyeX,
        eyeY,
        rx * 1.02,
        ry * 1.12,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();


    /* ======================================
       EYE WHITE
    ====================================== */

    ctx.save();


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


    const sclera =

        ctx.createLinearGradient(

            eyeX,
            eyeY - ry,

            eyeX,
            eyeY + ry

        );


    sclera.addColorStop(
        0,
        "#e7fbff"
    );


    sclera.addColorStop(
        .5,
        "#8eafbd"
    );


    sclera.addColorStop(
        1,
        "#334b58"
    );


    ctx.fillStyle =
        sclera;


    ctx.fill();


    ctx.restore();


    /* ======================================
       IRIS
    ====================================== */

    const irisX =

        eyeX +
        Math.sin(
            time * .47
        )
        *
        rx *
        .07;


    const irisY =

        eyeY +
        Math.cos(
            time * .37
        )
        *
        ry *
        .15;


    const irisRadius =
        ry * .92;


    const iris =

        ctx.createRadialGradient(

            irisX -
            irisRadius * .2,

            irisY -
            irisRadius * .2,

            irisRadius * .05,

            irisX,
            irisY,

            irisRadius

        );


    iris.addColorStop(
        0,
        "#ffffff"
    );


    iris.addColorStop(
        .15,
        "#56eaff"
    );


    iris.addColorStop(
        .45,
        "#009acb"
    );


    iris.addColorStop(
        .75,
        "#003d63"
    );


    iris.addColorStop(
        1,
        "#00111c"
    );


    ctx.save();


    ctx.shadowColor =
        "#00cfff";

    ctx.shadowBlur =
        20;


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


    /* ======================================
       PUPIL
    ====================================== */

    ctx.fillStyle =
        "#010207";


    ctx.beginPath();


    ctx.arc(

        irisX,
        irisY,

        irisRadius * .35,

        0,
        Math.PI * 2

    );


    ctx.fill();


    /* ======================================
       EYE REFLECTION
    ====================================== */

    ctx.fillStyle =
        "rgba(255,255,255,.9)";


    ctx.beginPath();


    ctx.arc(

        irisX -
        irisRadius * .25,

        irisY -
        irisRadius * .27,

        irisRadius * .13,

        0,
        Math.PI * 2

    );


    ctx.fill();


    /* ======================================
       BLINK AMOUNT
    ====================================== */

    const blink =
        getBlinkAmount(time);


    const upper =
        blink;


    const lower =
        blink * .82;


    /* ======================================
       UPPER EYELID
    ====================================== */

    ctx.save();


    ctx.fillStyle =
        "#05080d";


    ctx.beginPath();


    ctx.moveTo(

        eyeX -
        rx * 1.10,

        eyeY

    );


    ctx.quadraticCurveTo(

        eyeX -
        rx * .60,

        eyeY -
        ry *
        (2 -
        1.05 *
        upper),

        eyeX,

        eyeY -
        ry *
        (2 -
        1.05 *
        upper)

    );


    ctx.quadraticCurveTo(

        eyeX +
        rx * .60,

        eyeY -
        ry *
        (2 -
        1.05 *
        upper),

        eyeX +
        rx * 1.10,

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


    /* ======================================
       LOWER EYELID
    ====================================== */

    ctx.beginPath();


    ctx.moveTo(

        eyeX -
        rx * 1.10,

        eyeY

    );


    ctx.quadraticCurveTo(

        eyeX -
        rx * .60,

        eyeY +
        ry *
        (2 -
        1.0 *
        lower),

        eyeX,

        eyeY +
        ry *
        (2 -
        1.0 *
        lower)

    );


    ctx.quadraticCurveTo(

        eyeX +
        rx * .60,

        eyeY +
        ry *
        (2 -
        1.0 *
        lower),

        eyeX +
        rx * 1.10,

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


    /* ======================================
       EYELID EDGE
    ====================================== */

    ctx.strokeStyle =
        "rgba(100,210,240,.6)";


    ctx.lineWidth =
        4;


    ctx.beginPath();


    ctx.moveTo(
        eyeX - rx,
        eyeY
    );


    ctx.quadraticCurveTo(

        eyeX -
        rx * .5,

        eyeY -
        ry *
        (1.05 -
        upper),

        eyeX,

        eyeY -
        ry *
        (1.05 -
        upper)

    );


    ctx.quadraticCurveTo(

        eyeX +
        rx * .5,

        eyeY -
        ry *
        (1.05 -
        upper),

        eyeX + rx,

        eyeY

    );


    ctx.stroke();


    ctx.restore();


    /* ======================================
       SCANLINES
    ====================================== */

    ctx.globalAlpha =
        .06;


    ctx.fillStyle =
        "#9eefff";


    for (
        let y = 0;
        y < H;
        y += 8
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


    ctx.restore();

}


/* ============================================
   ANIMATION LOOP
============================================ */

function render() {

    const time =

        audio.duration
            ?
        audio.currentTime
            :
        (
            performance.now()
            / 1000
        )
        % 30;


    drawEye(time);


    requestAnimationFrame(
        render
    );

}


render();


/* ============================================
   LRCLIB SEARCH
============================================ */

async function searchLyrics(query) {

    const url =

        "https://lrclib.net/api/search?q="
        +
        encodeURIComponent(query);


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Lyrics search failed"
        );

    }


    return response.json();

}


/* ============================================
   SEARCH UI
============================================ */

searchButton.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "keydown",

    event => {

        if (
            event.key === "Enter"
        ) {

            performSearch();

        }

    }

);


async function performSearch() {

    const query =
        searchInput.value.trim();


    if (!query) {

        status.textContent =
            "Type a song or artist.";

        return;

    }


    status.textContent =
        "Searching...";


    results.innerHTML =
        "";


    try {

        const songs =
            await searchLyrics(
                query
            );


        if (
            !songs ||
            !songs.length
        ) {

            status.textContent =
                "No matching songs found.";

            return;

        }


        status.textContent =
            `${songs.length} results found`;


        songs
            .slice(0, 10)
            .forEach(
                song => {

                    createSongCard(
                        song
                    );

                }
            );

    }

    catch (error) {

        console.error(error);

        status.textContent =
            "Search failed. Try again.";

    }

}


/* ============================================
   SONG CARD
============================================ */

function createSongCard(song) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "song";


    const image =
        document.createElement(
            "img"
        );


    /*
       LRCLIB does not provide
       album artwork in every response.

       Use a generated placeholder.
    */

    image.src =
        createArtwork(
            song.trackName ||
            song.name
        );


    const info =
        document.createElement(
            "div"
        );


    info.className =
        "song-info";


    const name =
        document.createElement(
            "div"
        );


    name.className =
        "song-name";


    name.textContent =
        song.trackName ||
        song.name ||
        "Unknown";


    const artist =
        document.createElement(
            "div"
        );


    artist.className =
        "artist";


    artist.textContent =
        song.artistName ||
        "Unknown artist";


    info.appendChild(
        name
    );


    info.appendChild(
        artist
    );


    const badge =
        document.createElement(
            "div"
        );


    badge.className =
        "badge";


    badge.textContent =

        song.syncedLyrics
            ?
        "SYNCED"
            :
        "LYRICS";


    item.appendChild(
        image
    );


    item.appendChild(
        info
    );


    item.appendChild(
        badge
    );


    item.addEventListener(
        "click",

        () => {

            selectSong(
                song
            );

        }

    );


    results.appendChild(
        item
    );

}


/* ============================================
   ARTWORK PLACEHOLDER
============================================ */

function createArtwork(text) {

    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
        >

            <rect
                width="200"
                height="200"
                fill="#061522"
            />

            <circle
                cx="100"
                cy="100"
                r="70"
                fill="#008dcc"
                opacity=".25"
            />

            <circle
                cx="100"
                cy="100"
                r="42"
                fill="#00cfff"
                opacity=".20"
            />

            <text
                x="100"
                y="108"
                text-anchor="middle"
                fill="white"
                font-size="20"
                font-family="Arial"
            >
                ♪
            </text>

        </svg>

    `;


    return (

        "data:image/svg+xml;charset=UTF-8,"
        +
        encodeURIComponent(svg)

    );

}


/* ============================================
   SELECT SONG
============================================ */

async function selectSong(song) {

    currentSong =
        song;


    songTitle.textContent =

        `${song.trackName || song.name}
         — ${song.artistName || ""}`;


    status.textContent =
        "Loading lyrics...";


    /*
       LRCLIB provides the synchronized
       lyrics when available.
    */

    try {

        const params =
            new URLSearchParams({

                track_name:
                    song.trackName ||
                    song.name ||
                    "",

                artist_name:
                    song.artistName ||
                    "",

                album_name:
                    song.albumName ||
                    "",

                duration:
                    song.duration ||
                    ""

            });


        const response =

            await fetch(

                "https://lrclib.net/api/get?"
                +
                params.toString()

            );


        if (
            response.ok
        ) {

            const data =
                await response.json();


            lyrics =

                parseSyncedLyrics(
                    data.syncedLyrics
                );

        }

        else {

            lyrics =
                parseSyncedLyrics(
                    song.syncedLyrics
                );

        }

    }

    catch (error) {

        console.warn(
            "Lyrics unavailable",
            error
        );


        lyrics =
            parseSyncedLyrics(
                song.syncedLyrics
            );

    }


    renderInitialLyrics();


    /*
       IMPORTANT AUDIO NOTE:

       Search/lyrics services do not give us
       a license to download copyrighted songs.

       Therefore this demo looks for a local
       authorized preview at:

       assets/music.mp3

       Replace that file with audio you are
       legally allowed to use.

       The selected online song controls
       the lyrics/title; local audio is the
       playable source.
    */

    audio.src =
        "assets/music.mp3";


    audio.load();


    try {

        await audio.play();

        playButton.textContent =
            "⏸";

    }

    catch {

        playButton.textContent =
            "▶";

        status.textContent =
   "▶";

        status.textContent =
            "Song selected. Tap Play to start.";

    }

}


/* ============================================
   PARSE LRC
============================================ */

function parseSyncedLyrics(lrc) {

    if (!lrc) {

        return [];

    }


    const lines =
        lrc.split("\n");


    const output = [];


    for (
        const line
        of lines
    ) {

        const match =

            line.match(
                /^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/
            );


        if (!match) {

            continue;

        }


        const minutes =
            Number(
                match[1]
            );


        const seconds =
            Number(
                match[2]
            );


        const text =
            match[3].trim();


        output.push({

            time:
                minutes * 60 +
                seconds,

            text

        });

    }


    return output.sort(
        (a,b) =>
            a.time -
            b.time
    );

}


/* ============================================
   RENDER CURRENT LYRICS
============================================ */

function renderLyrics() {

    if (!lyrics.length) {

        currentLyric.textContent =
            "Lyrics unavailable";

        previousLyric.textContent =
            "";

        nextLyric.textContent =
            "";

        return;

    }


    const time =
        audio.currentTime;


    let index = -1;


    for (
        let i = 0;
        i < lyrics.length;
        i++
    ) {

        if (
            lyrics[i].time
            <=
            time
        ) {

            index =
                i;

        }

    }


    if (index < 0) {

        currentLyric.textContent =
            "♪";

        previousLyric.textContent =
            "";

        nextLyric.textContent =
            lyrics[0].text;

        return;

    }


    previousLyric.textContent =

        lyrics[index - 1]
            ?
        lyrics[index - 1].text
            :
        "";


    currentLyric.textContent =

        lyrics[index].text;


    nextLyric.textContent =

        lyrics[index + 1]
            ?
        lyrics[index + 1].text
            :
        "";


    if (
        index !==
        lastLyricIndex
    ) {

        lastLyricIndex =
            index;


        triggerBeat();

    }

}


/* ============================================
   INITIAL LYRICS
============================================ */

function renderInitialLyrics() {

    lastLyricIndex =
        -1;


    if (
        lyrics.length
    ) {

        currentLyric.textContent =
            lyrics[0].text;

        nextLyric.textContent =

            lyrics[1]
                ?
            lyrics[1].text
                :
            "";

    }

    else {

        currentLyric.textContent =
            "Lyrics unavailable";

    }

}


/* ============================================
   BEAT VISUAL
============================================ */

function triggerBeat() {

    visual.classList.add(
        "beat"
    );


    setTimeout(
        () => {

            visual.classList.remove(
                "beat"
            );

        },

        120

    );

}


/* ============================================
   AUDIO TIME
============================================ */

audio.addEventListener(
    "timeupdate",

    renderLyrics
);


/* ============================================
   PLAY BUTTON
============================================ */

playButton.addEventListener(
    "click",

    async () => {

        if (
            audio.paused
        ) {

            try {

                await audio.play();

                playButton.textContent =
                    "⏸";

            }

            catch {

                status.textContent =
                    "Tap Play again to allow audio.";

            }

        }

        else {

            audio.pause();

            playButton.textContent =
                "▶";

        }

    }
);


/* ============================================
   MUTE
============================================ */

muteButton.addEventListener(
    "click",

    () => {

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


/* ============================================
   FULLSCREEN
============================================ */

fullscreenButton.addEventListener(
    "click",

    async () => {

        if (
            !document.fullscreenElement
        ) {

            await visual.requestFullscreen?.();

        }

        else {

            await document.exitFullscreen?.();

        }

    }
);


/* ============================================
   AUTO SEARCH EXAMPLE
============================================ */

/*
   Page खुलने पर कोई copyrighted song
   automatically download नहीं किया जाता।

   User खुद search करता है.
*/


status.textContent =
    "Search a song, then tap a result.";
