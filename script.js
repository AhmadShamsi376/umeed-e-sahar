const navBtn=document.querySelector('.menu');const nav=document.querySelector('.nav');if(navBtn)navBtn.addEventListener('click',()=>nav.classList.toggle('open'));
const articles=[
 {cat:'Society',urdu:'معاشرہ',title:'The Changing Face of Our Cities',excerpt:'Urban spaces, memory and modern life — and what our streets reveal about us.',type:'society',href:'article.html#cities'},
 {cat:'Economics',urdu:'معاشیات',title:'Why Inflation Feels Different for Everyone',excerpt:'Prices, wages and purchasing power: a quiet guide to the economics behind everyday life.',type:'econ',href:'article.html#inflation'},
 {cat:'History',urdu:'تاریخ',title:'The Forgotten Chapters of Our Past',excerpt:'History is more than dates. It is the inheritance hidden inside ordinary places and institutions.',type:'history',href:'article.html#past'},
 {cat:'Society',urdu:'سماج',title:'The Things We Stop Asking',excerpt:'A student editorial on curiosity, conformity and the courage to ask better questions.',type:'society',href:'article.html#questions'}
];
const poetry=[{title:'وہ جو خاموشی ہے',urdu:'وہ جو خاموشی ہے',excerpt:'A poem about the things left unsaid.',href:'poetry.html#khamoshi'},{title:'صبح کی طرف',urdu:'صبح کی طرف',excerpt:'A short reflection on hope and the ordinary work of beginning again.',href:'poetry.html#subah'}];
function card(a){return `<article class="card"><a class="thumb ${a.type}" href="${a.href}"><span>${a.urdu}</span></a><div class="tag">${a.cat}</div><h3>${a.title}</h3><p>${a.excerpt}</p><a class="read" href="${a.href}">Read piece →</a></article>`}
const latest=document.querySelector('[data-latest]');if(latest)latest.innerHTML=articles.map(card).join('');
const po=document.querySelector('[data-poetry]');if(po)po.innerHTML=poetry.map(p=>card({cat:'Poetry',urdu:p.urdu,title:p.title,excerpt:p.excerpt,type:'poem',href:p.href})).join('');
