(function (m, e, t, r, i, k, a) {
  m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
  m[i].l = 1 * new Date();
  for (let j = 0; j < document.scripts.length; j += 1) {
    if (document.scripts[j].src === r) return;
  }
  k = e.createElement(t);
  a = e.getElementsByTagName(t)[0];
  k.async = 1;
  k.src = r;
  a.parentNode.insertBefore(k, a);
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=114148858', 'ym');

window.ym(114148858, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: 'dataLayer',
  accurateTrackBounce: true,
  trackLinks: true
});

window.ACTIVITY_MONITOR_METRICA_ID = 114148858;

window.sendAnalyticsEvent = function sendAnalyticsEvent(eventName, parameters = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...parameters });

  if (typeof window.ym === 'function') {
    window.ym(window.ACTIVITY_MONITOR_METRICA_ID, 'reachGoal', eventName, parameters);
  }
};
