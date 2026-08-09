const menu=document.querySelector('.menu'), nav=document.querySelector('.navlinks');
if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
