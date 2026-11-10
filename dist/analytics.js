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
window.ACTIVITY_MONITOR_GA4_ID = 'G-ETXVKWM0HR';

window.sendAnalyticsEvent = function sendAnalyticsEvent(eventName, parameters = {}) {
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

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: goalName, ...parameters });

  if (typeof window.ym === 'function') {
    window.ym(window.ACTIVITY_MONITOR_METRICA_ID, 'reachGoal', goalName, parameters);
  }

  if (typeof window.gtag === 'function' && goalName !== 'scroll_90') {
    const ga4Parameters = { ...parameters };

    if (parameters.ecommerce) {
      Object.assign(ga4Parameters, parameters.ecommerce);
      delete ga4Parameters.ecommerce;
    }

    window.gtag('event', goalName, ga4Parameters);
  }
};

let scroll90Sent = false;
window.addEventListener('scroll', () => {
  if (scroll90Sent) return;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (documentHeight <= 0) return;
  if (window.scrollY / documentHeight >= 0.9) {
    scroll90Sent = true;
    window.sendAnalyticsEvent('scroll_90', { page_path: window.location.pathname });
  }
}, { passive: true });
