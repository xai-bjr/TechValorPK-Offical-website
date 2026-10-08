(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const header=$("#header"),topBtn=$("#topButton"),navToggle=$("#navToggle"),nav=$(".nav nav"),scene=$("#scene"),cursor=$("#cursor"),canvas=$("#heroCanvas");

const scrollUI=()=>{header.classList.toggle("scrolled",scrollY>25);topBtn.classList.toggle("show",scrollY>520)};addEventListener("scroll",scrollUI,{passive:true});scrollUI();

navToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");navToggle.setAttribute("aria-expanded",String(open))});
$$(".nav nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");navToggle.setAttribute("aria-expanded","false")}));
addEventListener("click",e=>{if(!nav.contains(e.target)&&!navToggle.contains(e.target))nav.classList.remove("open")});
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

const reveal=$$(".reveal");
if("IntersectionObserver"in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");ob.unobserve(e.target)}}),{threshold:.13,rootMargin:"0px 0px -35px"});reveal.forEach(x=>ob.observe(x))}else reveal.forEach(x=>x.classList.add("show"));

const counters=$$("[data-count]");
if("IntersectionObserver"in window){const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,to=Number(el.dataset.count),start=performance.now(),dur=850;const frame=t=>{const p=Math.min((t-start)/dur,1),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v;if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame);co.unobserve(el)}}),{threshold:.7});counters.forEach(x=>co.observe(x))}

const fine=matchMedia("(pointer:fine)").matches;
if(fine){document.body.classList.add("ready");addEventListener("pointermove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";if(scene){const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;scene.style.transform=`rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg)`}});$$(".tilt").forEach(card=>{card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,rx=(y/r.height-.5)*-7,ry=(x/r.width-.5)*7;card.style.transform=`perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`});card.addEventListener("pointerleave",()=>card.style.transform="")})}

const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
const initCanvas=()=>{if(!canvas)return;const c=canvas.getContext("2d");if(!c)return;let w=0,h=0,ps=[];const dpr=Math.min(devicePixelRatio||1,2);const resize=()=>{const r=canvas.getBoundingClientRect();w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;c.setTransform(dpr,0,0,dpr,0,0);ps=Array.from({length:Math.max(35,Math.min(85,Math.floor(w/15)))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.14,r:Math.random()*1.25+.35,a:Math.random()*.36+.07}))};addEventListener("resize",resize);resize();const draw=()=>{c.clearRect(0,0,w,h);for(let i=0;i<ps.length;i++){const p=ps[i];p.x+=p.vx;p.y+=p.vy;if(p.x<-20)p.x=w+20;if(p.x>w+20)p.x=-20;if(p.y<-20)p.y=h+20;if(p.y>h+20)p.y=-20;c.beginPath();c.arc(p.x,p.y,p.r,0,Math.PI*2);c.fillStyle=`rgba(111,194,255,${p.a})`;c.fill();for(let j=i+1;j<ps.length;j++){const q=ps[j],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<110){c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.strokeStyle=`rgba(85,173,255,${(1-dist/110)*.07})`;c.stroke()}}}requestAnimationFrame(draw)};if(reduced){c.clearRect(0,0,w,h)}else draw()};initCanvas();

const year=$("#year");if(year)year.textContent=new Date().getFullYear();
console.log("%cTechValorPK","color:#66c2ff;background:#07121f;padding:8px 12px;border-radius:8px;font-weight:700");console.log("Build → Test → Troubleshoot → Automate → Improve.");
})();