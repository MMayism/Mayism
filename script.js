const cards=[...document.querySelectorAll('.art-card[data-index]')];
const modal=document.querySelector('.lightbox');
const modalImg=modal.querySelector('.lightbox-image img');
const modalTitle=modal.querySelector('.lightbox-caption strong');
const modalType=modal.querySelector('.lightbox-caption span');
let current=0;
function openArtwork(index){current=(index+cards.length)%cards.length;const card=cards[current];const image=card.querySelector('img');modalImg.src=image.src;modalImg.alt=image.alt;modalTitle.textContent=card.querySelector('b').textContent;modalType.textContent=card.querySelector('small').textContent;if(!modal.open)modal.showModal();}
cards.forEach((card,index)=>card.addEventListener('click',()=>openArtwork(index)));
modal.querySelector('.prev').addEventListener('click',()=>openArtwork(current-1));
modal.querySelector('.next').addEventListener('click',()=>openArtwork(current+1));
modal.querySelector('.lightbox-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.addEventListener('keydown',e=>{if(!modal.open)return;if(e.key==='ArrowLeft')openArtwork(current-1);if(e.key==='ArrowRight')openArtwork(current+1);if(e.key==='Escape')modal.close()});
const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('mobile-open',open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');document.querySelector('nav').classList.remove('mobile-open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
