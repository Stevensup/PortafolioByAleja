/* Menú del caso en celular. Archivo aparte para no tocar el scroll (Lenis) ni las animaciones (GSAP) de ivra.js. */
(function(){
  const btn=document.querySelector(".bar-menu"), sheet=document.getElementById("menu-caso");
  if(!btn||!sheet) return;
  const set=open=>{sheet.hidden=!open;btn.setAttribute("aria-expanded",open);btn.textContent=open?"Cerrar":"Menú";};
  btn.addEventListener("click",()=>set(sheet.hidden));
  sheet.addEventListener("click",e=>{if(e.target.closest("a"))set(false);});
  addEventListener("keydown",e=>{if(e.key==="Escape"&&!sheet.hidden){set(false);btn.focus();}});
  matchMedia("(min-width: 721px)").addEventListener("change",e=>{if(e.matches)set(false);});
})();
