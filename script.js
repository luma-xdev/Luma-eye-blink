/* ==========================================================
   CODED EYE BLINK — PURE JAVASCRIPT / CANVAS
   No MP4 required. The browser renders the animation live.
   ========================================================== */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const stage = document.getElementById("stage");
const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const fsBtn = document.getElementById("fsBtn");
const caption = document.getElementById("caption");

const CONFIG = {
  duration: 30,              // seconds before looping
  blinkMin: 2.2,             // minimum seconds between blinks
  blinkMax: 5.0,             // maximum seconds between blinks
  closeTime: 0.13,           // closing phase
  holdTime: 0.055,           // fully closed
  openTime: 0.18,            // opening phase
  irisColor: [65, 190, 255], // RGB
  glow: true,
  musicSync: true
};

let W = 1080, H = 1920;
let running = false;
let raf = 0;
let startWall = 0;
let elapsed = 0;
let nextBlink = 2.8;
let blinkStart = -1;
let blinkPhase = 0;
let seed = Math.random() * 1000;

const rand = (a,b) => a + Math.random() * (b-a);
const clamp = (x,a=0,b=1) => Math.max(a, Math.min(b,x));
const smooth = x => x*x*(3-2*x);

function resize(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const r = stage.getBoundingClientRect();
  W = Math.max(1, Math.floor(r.width*dpr));
  H = Math.max(1, Math.floor(r.height*dpr));
  canvas.width = W; canvas.height = H;
}
window.addEventListener("resize", resize);
resize();

function scheduleBlink(now){
  nextBlink = now + rand(CONFIG.blinkMin, CONFIG.blinkMax);
}

function blinkAmount(t){
  if(blinkStart < 0) return 0;
  const d = t - blinkStart;
  if(d < 0) return 0;
  if(d < CONFIG.closeTime) return smooth(d/CONFIG.closeTime);
  if(d < CONFIG.closeTime + CONFIG.holdTime) return 1;
  const u = (d - CONFIG.closeTime - CONFIG.holdTime)/CONFIG.openTime;
  if(u < 1) return 1 - smooth(u);
  blinkStart = -1;
  scheduleBlink(t);
  return 0;
}

/* Draw a procedural, stylized eye. The eyelids physically cover the
   sclera/iris, so it is a real blink animation rather than an iris-only effect. */
function drawEye(t){
  ctx.clearRect(0,0,W,H);

  const s = Math.min(W/1080, H/1920);
  const cx = W*.5;
  const cy = H*.43;

  // Slow camera motion
  const zoom = 1 + .035*Math.sin(t*.52);
  const swayX = Math.sin(t*.21)*W*.006;
  const swayY = Math.cos(t*.17)*H*.004;

  ctx.save();
  ctx.translate(cx+swayX, cy+swayY);
  ctx.scale(zoom, zoom);
  ctx.translate(-cx, -cy);

  // Dark blue cinematic background
  const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*.7);
  bg.addColorStop(0,"#10243a");
  bg.addColorStop(.38,"#07111e");
  bg.addColorStop(1,"#02040a");
  ctx.fillStyle=bg;
  ctx.fillRect(-20,-20,W+40,H+40);

  // Floating glow
  if(CONFIG.glow){
    const g = ctx.createRadialGradient(cx,cy,0,cx,cy,W*.36);
    g.addColorStop(0,"rgba(0,180,255,.20)");
    g.addColorStop(.35,"rgba(0,90,255,.09)");
    g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=g;
    ctx.fillRect(0,0,W,H);
  }

  // Eye geometry
  const ex = cx;
  const ey = H*.39;
  const rx = W*.365;
  const ry = H*.105;

  // Outer eye glow
  ctx.save();
  ctx.filter = "blur(24px)";
  ctx.fillStyle = "rgba(0,180,255,.30)";
  ctx.beginPath();
  ctx.ellipse(ex,ey,rx*1.02,ry*1.1,0,Math.PI,Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Eye white / sclera
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ex-rx,ey);
  ctx.quadraticCurveTo(ex-rx*.48,ey-ry*1.1,ex,ey-ry);
  ctx.quadraticCurveTo(ex+rx*.48,ey-ry*1.1,ex+rx,ey);
  ctx.quadraticCurveTo(ex+rx*.48,ey+ry*1.1,ex,ey+ry);
  ctx.quadraticCurveTo(ex-rx*.48,ey+ry*1.1,ex-rx,ey);
  ctx.closePath();

  const sclera = ctx.createLinearGradient(ex,ey-ry,ex,ey+ry);
  sclera.addColorStop(0,"#dff8ff");
  sclera.addColorStop(.5,"#8db3c2");
  sclera.addColorStop(1,"#35505d");
  ctx.fillStyle=sclera;
  ctx.fill();
  ctx.restore();

  // Iris / pupil
  const blink = blinkAmount(t);
  const irisX = ex + Math.sin(t*.47+seed)*rx*.075;
  const irisY = ey + Math.cos(t*.37+seed)*ry*.16;

  ctx.save();
  // Iris gets partially hidden naturally by eyelid masks below.
  const ir = ry*.92;
  const iris = ctx.createRadialGradient(irisX-ir*.2,irisY-ir*.2,ir*.08,irisX,irisY,ir);
  iris.addColorStop(0,"#e9ffff");
  iris.addColorStop(.14,"#55e8ff");
  iris.addColorStop(.48,"#008fc2");
  iris.addColorStop(.78,"#003d66");
  iris.addColorStop(1,"#00131f");
  ctx.fillStyle=iris;
  ctx.shadowBlur=18;
  ctx.shadowColor="rgba(0,200,255,.9)";
  ctx.beginPath();
  ctx.arc(irisX,irisY,ir,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle="#010307";
  ctx.shadowBlur=0;
  ctx.beginPath();
  ctx.arc(irisX,irisY,ir*.36,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle="rgba(255,255,255,.9)";
  ctx.beginPath();
  ctx.arc(irisX-ir*.25,irisY-ir*.27,ir*.13,0,Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Lid masks. Upper lid travels down; lower lid travels up.
  const upper = blink;
  const lower = blink*.82;

  ctx.save();
  ctx.fillStyle="#05080d";

  // Upper eyelid / skin
  ctx.beginPath();
  ctx.moveTo(ex-rx*1.08, ey);
  ctx.quadraticCurveTo(ex-rx*.62, ey-ry*(2.0-1.05*upper), ex, ey-ry*(2.0-1.05*upper));
  ctx.quadraticCurveTo(ex+rx*.62, ey-ry*(2.0-1.05*upper), ex+rx*1.08, ey);
  ctx.lineTo(ex+rx*1.2,0);
  ctx.lineTo(ex-rx*1.2,0);
  ctx.closePath();
  ctx.fill();

  // Lower lid / skin
  ctx.beginPath();
  ctx.moveTo(ex-rx*1.08, ey);
  ctx.quadraticCurveTo(ex-rx*.62, ey+ry*(2.0-1.0*lower), ex, ey+ry*(2.0-1.0*lower));
  ctx.quadraticCurveTo(ex+rx*.62, ey+ry*(2.0-1.0*lower), ex+rx*1.08, ey);
  ctx.lineTo(ex+rx*1.2,H);
  ctx.lineTo(ex-rx*1.2,H);
  ctx.closePath();
  ctx.fill();

  // Eyelid edges
  ctx.strokeStyle="rgba(100,190,220,.55)";
  ctx.lineWidth=Math.max(2,4*s);
  ctx.beginPath();
  ctx.moveTo(ex-rx,ey);
  ctx.quadraticCurveTo(ex-rx*.48,ey-ry*(1.05-upper*.95),ex,ey-ry*(1.05-upper*.95));
  ctx.quadraticCurveTo(ex+rx*.48,ey-ry*(1.05-upper*.95),ex+rx,ey);
  ctx.stroke();

  ctx.restore();

  // Subtle scanline/reflection
  ctx.globalAlpha=.08;
  ctx.fillStyle="#8eeeff";
  for(let y=0;y<H;y+=8) ctx.fillRect(0,y,W,1);
  ctx.globalAlpha=1;

  ctx.restore();
}

function update(t){
  elapsed = t % CONFIG.duration;

  if(blinkStart < 0 && elapsed >= nextBlink) {
    blinkStart = elapsed;
  }
  drawEye(elapsed);

  // Caption pulse
  const pulse = 1 + .025*Math.sin(elapsed*3);
  caption.style.transform = `scale(${pulse})`;

  if(CONFIG.musicSync && !music.paused && music.duration) {
    // Optional: if your music has a different length, its current position
    // is used as the animation clock.
    elapsed = music.currentTime % CONFIG.duration;
  }

  raf = requestAnimationFrame(loop);
}

function loop(){
  const now = (performance.now()-startWall)/1000;
  update(now);
}

async function play(){
  try {
    await music.play();
  } catch(e) {
    // Autoplay/audio restrictions are normal. Animation still works.
  }
  running = true;
  playBtn.textContent="⏸ Pause";
  startWall = performance.now() - elapsed*1000;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(loop);
}

function pause(){
  music.pause();
  running=false;
  playBtn.textContent="▶ Play";
  cancelAnimationFrame(raf);
}

playBtn.addEventListener("click",()=> running ? pause() : play());

muteBtn.addEventListener("click",()=>{
  music.muted=!music.muted;
  muteBtn.textContent=music.muted ? "🔇 Muted" : "🔊 Sound";
});

fsBtn.addEventListener("click",async()=>{
  if(!document.fullscreenElement) await stage.requestFullscreen?.();
  else await document.exitFullscreen?.();
});

// Spacebar play/pause
window.addEventListener("keydown",e=>{
  if(e.code==="Space" && e.target.tagName!=="BUTTON"){
    e.preventDefault();
    running ? pause() : play();
  }
});

// Start rendering silently; user clicks Play for audio.
scheduleBlink(0);
drawEye(0);
