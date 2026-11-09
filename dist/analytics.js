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
    let goalName = eventName;

    if (eventName === 'download_attempt') goalName = 'download_click';
    if (eventName === 'compare_periods_open') goalName = 'period_compare';
    if (eventName === 'model_trainer_open_demo') goalName = 'trainer_open';

    if (eventName === 'cta_click') {
      const placement = parameters.cta_name || '';
      if (placement.includes('demo')) goalName = 'demo_open';
      else if (placement.includes('download')) goalName = 'download_click';
      else if (placement === 'nav_models') goalName = 'models_open';
      else goalName = 'navigation_click';
    }

    window.ym(window.ACTIVITY_MONITOR_METRICA_ID, 'reachGoal', goalName, parameters);
  }
};
