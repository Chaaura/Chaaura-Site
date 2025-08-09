
function setupCarousel(el){
  const track = el.querySelector('.carousel-track');
  if(!track) return;
  const slides = Array.from(track.children);
  slides.forEach(img=>{ if(img.naturalWidth===0) img.style.display='none'; });
  const validSlides = slides.filter(img=>img.style.display!=='none');
  if(validSlides.length===0){ el.style.display='none'; return; }
  let index = 0;
  const prev = el.querySelector('[data-prev]');
  const next = el.querySelector('[data-next]');
  const dotsWrap = el.querySelector('.dots');
  dotsWrap.innerHTML = '';
  validSlides.forEach((_,i)=>{
    const d=document.createElement('div'); d.className='dot'+(i===0?' active':''); d.dataset.index=i;
    d.addEventListener('click',()=>{ index=i; update(); });
    dotsWrap.appendChild(d);
  });
  function update(){
    const w = el.clientWidth;
    track.style.transform = `translateX(${-index*w}px)`;
    dotsWrap.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active', i===index));
  }
  prev.addEventListener('click',()=>{ index=(index-1+validSlides.length)%validSlides.length; update(); });
  next.addEventListener('click',()=>{ index=(index+1)%validSlides.length; update(); });
  window.addEventListener('resize', update);
  update();
}
window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.carousel').forEach(setupCarousel);
});
