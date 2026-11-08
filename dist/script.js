const demoData={day:{label:'Сегодня',total:'6 ч 42 мин',top:'Работа',break:'38 мин',share:'46%',values:[46,27,17,10],hours:[18,42,55,48,37,22,61,35],labels:['10','12','14','16','18','20','22','24'],insight:'Самый длинный развлекательный период начался после 17:00. Мягкое напоминание могло бы обозначить точку возврата.'},week:{label:'Последние 7 дней',total:'38 ч 15 мин',top:'Обучение',break:'1 ч 12 мин',share:'34%',values:[31,34,22,13],hours:[44,67,51,72,59,36,49],labels:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],insight:'В четверг доля обучения была выше всего. В выходные выросла продолжительность развлекательных сессий.'},month:{label:'Последние 30 дней',total:'164 ч 08 мин',top:'Работа',break:'1 ч 34 мин',share:'39%',values:[39,28,21,12],hours:[48,62,55,70,46,74,58,66],labels:['1','5','9','13','17','21','25','30'],insight:'Во второй половине месяца рабочие периоды стали длиннее, но вместе с ними выросла продолжительность перерывов.'}};
const categories=[['Работа','#2563eb'],['Обучение','#7c3aed'],['Развлечения','#f97316'],['Общение','#16a34a']];
function track(event,params={}){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,...params});}
function render(period='day'){
  const d=demoData[period];
  document.querySelector('#total-time').textContent=d.total;document.querySelector('#top-category').textContent=d.top;document.querySelector('#long-break').textContent=d.break;document.querySelector('#period-label').textContent=d.label;document.querySelector('#focus-share').textContent=d.share;document.querySelector('#insight-text').textContent=d.insight;
  let start=0;const stops=d.values.map((v,i)=>{const end=start+v;const s=`${categories[i][1]} ${start}% ${end}%`;start=end;return s});document.querySelector('#demo-donut').style.background=`conic-gradient(${stops.join(',')})`;
  document.querySelector('#legend').innerHTML=d.values.map((v,i)=>`<li><i style="--c:${categories[i][1]}"></i><span>${categories[i][0]}</span><b>${v}%</b></li>`).join('');
  document.querySelector('#timeline').innerHTML=d.hours.map((v,i)=>`<div style="--h:${v}%"><span>${d.labels[i]}</span></div>`).join('');
}
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>track('cta_click',{cta_name:el.dataset.track,cta_text:el.textContent.trim()})));
document.querySelectorAll('[data-period]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-period]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');render(btn.dataset.period);track('statistics_period_change',{period:btn.dataset.period});}));
document.querySelector('#category-select').addEventListener('change',e=>{track('statistics_category_filter',{category:e.target.value});document.querySelector('#insight-text').textContent=e.target.value==='all'?demoData[document.querySelector('[data-period].active').dataset.period].insight:`Фильтр «${e.target.options[e.target.selectedIndex].text}» применён. В программе он перестраивает графики и таблицы за выбранный период.`});
document.querySelector('#compare-button').addEventListener('click',()=>{track('compare_periods_open',{source:'interactive_demo'});const el=document.querySelector('#insight-text');el.textContent='По сравнению с предыдущим периодом доля непрерывных развлекательных сессий снизилась на 8%. Это демонстрационный вывод.';document.querySelector('#compare-button').textContent='Сравнение открыто'});
['download-button','footer-download'].forEach(id=>document.querySelector('#'+id).addEventListener('click',()=>{track('download_attempt',{platform:'windows',availability:'not_connected'});document.querySelector('#download-note').textContent='Загрузка будет подключена после выбора файла релиза.';document.querySelector('#download-note').scrollIntoView({behavior:'smooth',block:'center'})}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const lightbox=document.querySelector('#image-lightbox');
const lightboxImage=document.querySelector('#lightbox-image');
const lightboxCaption=document.querySelector('#lightbox-caption');
document.querySelectorAll('[data-lightbox-src]').forEach(button=>button.addEventListener('click',()=>{
  lightboxImage.src=button.dataset.lightboxSrc;
  lightboxImage.alt=button.querySelector('img')?.alt||'Скриншот Activity Monitor';
  lightboxCaption.textContent=button.dataset.lightboxCaption||'';
  lightbox.showModal();
  track('screenshot_open',{screen_name:button.dataset.lightboxCaption||'unknown'});
}));
document.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
render();
