/* Ivra · caso de estudio
   Un solo controlador (Dot) mueve el punto de la "i" por toda la página según el scroll.
   Keyframes por sección (BRIEF §5):
   01 hero      → dentro del logo, latiendo
   04 símbolo   → recorre la diagonal hasta su lugar
   02-07        → borde derecho, indicador de progreso
   08           → baja al centro, crece y se vuelve el ícono de la app
   09-14        → punto rosa junto al título de cada sección
   15 cierre    → vuelve a su lugar dentro del logo                                   */
(function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root=document.documentElement;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const lerp=(a,b,t)=>a+(b-a)*t;
  const MENTA="#3DFFB6", ROSA="#FF3FA4";

  root.classList.add(reduce?"no-motion":"motion");

  /* ---------- top bar border ---------- */
  const bar=$(".bar");
  addEventListener("scroll",()=>bar.classList.toggle("on",scrollY>8),{passive:true});

  /* ---------- small interactions in the design system ---------- */
  $$(".c-auto button").forEach(b=>b.addEventListener("click",()=>{
    $$(".c-auto button").forEach(x=>{x.classList.toggle("sel",x===b);x.setAttribute("aria-checked",x===b)});
  }));
  const lim=$("#lim"), limv=$("#limv");
  const plata=n=>"$"+Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
  lim&&lim.addEventListener("input",()=>limv.textContent=plata(+lim.value));
  $$(".c-rule").forEach(b=>b.addEventListener("click",()=>{
    const on=b.getAttribute("aria-pressed")!=="true"; b.setAttribute("aria-pressed",on);
    b.querySelector("small").textContent=on?(b.dataset.on||"luz, agua e internet"):"pausada";
  }));
  $$(".c-rule").forEach(b=>b.dataset.on=b.querySelector("small").textContent==="pausada"?"tú la apagaste":b.querySelector("small").textContent);

  /* ---------- 11 · screens follow the text ---------- */
  const phoneImgs=$$("#phone img"), scs=$$(".sc");
  const setScreen=i=>{phoneImgs.forEach((im,k)=>im.classList.toggle("on",k===i));scs.forEach((s,k)=>s.classList.toggle("on",k===i));};
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setScreen(+e.target.dataset.i)}),{rootMargin:"-45% 0px -45% 0px"});
    scs.forEach(s=>io.observe(s));
  }
  setScreen(0);

  /* ---------- 04 · guide lengths for the draw-in ---------- */
  $$(".guides .draw").forEach(l=>{try{l.style.setProperty("--len",Math.ceil(l.getTotalLength())+"px")}catch(e){}});
  const sym=$(".sym");
  if("IntersectionObserver" in window){
    const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){sym.classList.add("on");io2.disconnect();}}),{threshold:.35});
    io2.observe(sym);
  } else sym.classList.add("on");

  if(reduce){ return; }   // everything below is motion only

  /* ---------- smooth scroll + GSAP ---------- */
  const hasGsap=!!(window.gsap&&window.ScrollTrigger);
  let lenis=null;
  if(hasGsap){
    gsap.registerPlugin(ScrollTrigger);
    if(window.Lenis){
      lenis=new Lenis({duration:1.1,smoothWheel:true});
      root.classList.add("lenis");
      lenis.on("scroll",ScrollTrigger.update);
      gsap.ticker.add(t=>lenis.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
      document.addEventListener("click",e=>{
        const a=e.target.closest('a[href^="#"]'); if(!a) return;
        const el=document.getElementById(a.getAttribute("href").slice(1)); if(!el) return;
        e.preventDefault(); lenis.scrollTo(el,{offset:-56,duration:1.4});
      });
    }

    /* entries: no displacement on text, a short rise on blocks */
    $$(".in").forEach(el=>{
      gsap.from(el,{y:24,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
    });
    gsap.from("#chat .bub",{y:16,opacity:0,duration:.6,stagger:.35,ease:"power2.out",scrollTrigger:{trigger:"#chat",start:"top 75%",once:true}});
    $$(".bento figure").forEach(f=>gsap.from(f,{y:40,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:f,start:"top 92%",once:true}}));
  }

  /* ---------- 08 · dot → app icon → phone ---------- */
  const s08=$("#s08"), morph=$("#morph"), mIcon=$(".m-icon"), mScreen=$(".m-screen"), t08=$("#t08");
  const ICON=112;
  function s08Progress(){
    const r=s08.getBoundingClientRect(); const span=r.height-innerHeight;
    return clamp(-r.top/span);
  }
  function phoneSize(){
    const mobile=innerWidth<760;
    const maxH=mobile?innerHeight*.52:innerHeight*.78;
    const w=Math.min(mobile?240:320,maxH*390/844);
    return {w,h:w*844/390,dx:mobile?0:Math.min(innerWidth*.2,300),dy:mobile?innerHeight*.14:0};
  }
  function render08(p){
    // 0–.40 the Dot travels in and grows (handled by Dot). .40 icon takes over.
    const ps=phoneSize();
    const show=clamp((p-.38)/.06);
    const k=ease(clamp((p-.46)/.32));             // icon → phone
    const w=lerp(ICON,ps.w,k), h=lerp(ICON,ps.h,k);
    morph.style.opacity=show;
    morph.style.width=w+"px"; morph.style.height=h+"px";
    morph.style.margin=(-h/2)+"px 0 0 "+(-w/2)+"px";
    morph.style.borderRadius=lerp(26,46,k)+"px";
    morph.style.borderColor=k>.05?"#2A2440":"transparent";
    morph.style.transform=`translate(${ps.dx*k}px,${ps.dy*k}px)`;
    mIcon.style.opacity=1-clamp((k-.25)/.35);
    mScreen.style.opacity=clamp((k-.35)/.4);
    const tk=clamp((p-.66)/.18);
    t08.style.opacity=tk;
    t08.style.translate=`0 ${(1-tk)*16}px`;
  }

  /* ---------- the Dot ---------- */
  const dot=$("#dot"), rail=$("#rail");
  const heroDot=$("#heroDot"), symDot=$("#symDot"), symSvg=$("#symSvg"), closeDot=$("#closeDot");
  const sec=id=>document.getElementById(id);
  const titled=["s09","s10","s11","prueba","s13","s14","s15"].map(id=>sec(id).querySelector(".slot"));
  const svgPt=(svg,x,y)=>{const m=svg.getScreenCTM();return {x:m.a*x+m.c*y+m.e,y:m.b*x+m.d*y+m.f,k:m.a};};
  const center=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,s:r.width};};

  let cur={x:innerWidth/2,y:innerHeight/2,s:14,o:0}, first=true;

  function target(){
    const vw=innerWidth, vh=innerHeight;
    const rail_x=vw<760?vw-10:vw-32;
    const pageP=clamp(scrollY/(document.documentElement.scrollHeight-vh));
    const railT={x:rail_x,y:vh*(.15+.7*pageP),s:14,c:MENTA,o:1,rail:true,snap:.22};

    // 15 · back into the closing logo
    const cl=sec("cierre").getBoundingClientRect();
    if(cl.top<vh*.72){const c=center(closeDot);return {x:c.x,y:c.y,s:c.s,c:ROSA,o:1,snap:.35};}

    // 08 · transition
    const r8=s08.getBoundingClientRect();
    if(r8.top<vh*.35 && r8.bottom>vh*.65){
      const p=s08Progress(); render08(p);
      const g=ease(clamp(p/.40));
      // land exactly on the dot of the app icon (centre offset +0.098w, -0.435w; Ø 0.26w)
      return {x:vw/2+ICON*.098*g,y:vh/2-ICON*.435*g,s:lerp(14,ICON*.26,g),c:MENTA,o:p<.44?1:0,snap:.3};
    } else render08(r8.top>=vh*.35?0:1);

    // 09–14 · pink dot next to the active title
    if(r8.bottom<=vh*.65){
      let slot=null;
      for(const sl of titled){ if(sl.getBoundingClientRect().top<vh*.6) slot=sl; }
      if(slot){const c=center(slot);return {x:c.x,y:c.y,s:14,c:ROSA,o:1,snap:.3};}
      return railT;
    }

    // 01 · hero
    const rh=sec("s01").getBoundingClientRect();
    if(rh.bottom>vh*.45){const c=center(heroDot);return {x:c.x,y:c.y,s:c.s,c:MENTA,o:1,pulse:true,snap:.5};}

    // 04 · travels the diagonal into its place
    const r4=sec("s04").getBoundingClientRect(), f=symSvg.getBoundingClientRect();
    if(f.top<vh*.85 && f.bottom>vh*.15 && r4.top<vh*.5){
      const p=ease(clamp((vh*.8-f.top)/(f.height*.9)));
      const x=lerp(0,289.2,p), y=lerp(0,-887.4,p);   // the stem's diagonal, foot → dot centre
      const s=svgPt(symSvg,x,y);
      return {x:s.x,y:s.y,s:lerp(40*s.k,229.2*s.k,p),c:MENTA,o:1,snap:.35};
    }
    return railT;
  }

  function frame(){
    const t=target();
    const k=first?1:t.snap;
    cur.x=lerp(cur.x,t.x,k); cur.y=lerp(cur.y,t.y,k); cur.s=lerp(cur.s,t.s,k); cur.o=lerp(cur.o,t.o,.25);
    first=false;
    dot.style.width=dot.style.height=cur.s+"px";
    dot.style.transform=`translate3d(${cur.x-cur.s/2}px,${cur.y-cur.s/2}px,0)`;
    dot.style.opacity=cur.o.toFixed(3);
    dot.style.setProperty("--dot",t.c);
    dot.classList.toggle("pulse",!!t.pulse);
    rail.classList.toggle("on",!!t.rail);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
