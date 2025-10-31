/* Shared JS for scroll reveal, back-to-top, and gentle canvas orbs (copy of main page behavior). */


// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){ entry.target.classList.add('show'); }
});
},{threshold:0.12});
revealEls.forEach(el=>io.observe(el));


// Back-to-top
const toTop = document.getElementById('toTop');
function toggleTop(){ if(window.scrollY>320) toTop.classList.add('show'); else toTop.classList.remove('show'); }
window.addEventListener('scroll', toggleTop); toggleTop();


// Canvas orbs light version (keeps file small for articles)
(function(){
const canvas = document.getElementById('bg-canvas');
if(!canvas) return;
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);


const orbs = [];
for(let i=0;i<12;i++){ orbs.push({x:Math.random()*W, y:Math.random()*H, r:40+Math.random()*80, vx:(Math.random()*2-1)*0.4, vy:(Math.random()*2-1)*0.4, hue: i%3===0 ? 'black' : 'purple', alpha:0.12 + Math.random()*0.1}); }
function step(){ ctx.clearRect(0,0,W,H); ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(0,0,W,H);
for(const o of orbs){ o.x+=o.vx; o.y+=o.vy; if(o.x<-o.r)o.x=W+o.r; if(o.x>W+o.r)o.x=-o.r; if(o.y<-o.r)o.y=H+o.r; if(o.y>H+o.r)o.y=-o.r; const g = ctx.createRadialGradient(o.x,o.y,o.r*0.2,o.x,o.y,o.r);
if(o.hue==='black'){ g.addColorStop(0,`rgba(0,0,0,${o.alpha})`); g.addColorStop(1,'rgba(0,0,0,0)'); }
else{ g.addColorStop(0,`rgba(109,40,217,${o.alpha})`); g.addColorStop(1,'rgba(109,40,217,0)'); }
ctx.save(); ctx.globalCompositeOperation='multiply'; ctx.filter='blur(60px)'; ctx.fillStyle=g; ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2); ctx.fill(); ctx.restore(); }
requestAnimationFrame(step);
}
if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches){ requestAnimationFrame(step); }
else{ const g = ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#ffffff'); g.addColorStop(1,'#faf8ff'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H); }
})();