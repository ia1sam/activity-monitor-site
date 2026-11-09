window.dataLayer = window.dataLayer || [];

function track(event, params = {}) {
  if (typeof window.sendAnalyticsEvent === 'function') {
    window.sendAnalyticsEvent(event, params);
    return;
  }
  window.dataLayer.push({ event, ...params });
}

function ecommerceData(model) {
  return {
    currency: 'RUB',
    value: 199,
    items: [{
      item_id: `${model.toLowerCase()}_model`,
      item_name: `Activity Monitor ${model}`,
      item_category: 'Classification model',
      price: 199,
      quantity: 1
    }]
  };
}

const purchaseDialog = document.querySelector('#purchase-dialog');
const purchaseForm = document.querySelector('#purchase-form');
const purchaseTitle = document.querySelector('#purchase-title');
const purchaseModel = document.querySelector('#purchase-model');
const purchasePrice = document.querySelector('#purchase-price');
const purchaseSubmit = document.querySelector('#purchase-submit');
const purchaseStatus = document.querySelector('#purchase-status');
const purchaseEmail = document.querySelector('#purchase-email');
let checkoutFormStarted = false;

document.querySelector('[data-model="balanced"]')?.addEventListener('click', () => {
  track('download_click', { model_profile: 'balanced', placement: 'models_page' });
});

document.querySelectorAll('.purchase-button').forEach((button) => {
  button.addEventListener('click', () => {
    const model = button.dataset.model;
    const price = button.dataset.price;
    const ecommerce = ecommerceData(model);

    purchaseDialog.dataset.model = model;
    purchaseTitle.textContent = `Модель ${model}`;
    purchaseModel.textContent = model;
    purchasePrice.textContent = price;
    purchaseSubmit.textContent = `Перейти к оплате — ${price}`;
    purchaseForm.reset();
    purchaseStatus.textContent = '';
    checkoutFormStarted = false;
    purchaseDialog.showModal();
    purchaseEmail.focus();

    window.dataLayer.push({ ecommerce: null });
    track('add_to_cart', {
      model_profile: model.toLowerCase(),
      order_price: 199,
      currency: 'RUB',
      ecommerce
    });
  });
});

document.querySelector('.purchase-close')?.addEventListener('click', () => {
  purchaseDialog.close();
});

purchaseDialog?.addEventListener('click', (event) => {
  if (event.target === purchaseDialog) purchaseDialog.close();
});

purchaseEmail?.addEventListener('input', () => {
  if (checkoutFormStarted) return;
  checkoutFormStarted = true;
  const model = purchaseDialog.dataset.model || 'unknown';
  track('checkout_form_start', { model_profile: model.toLowerCase() });
});

purchaseForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const model = purchaseDialog.dataset.model || 'unknown';
  const ecommerce = model === 'unknown' ? undefined : ecommerceData(model);

  window.dataLayer.push({ ecommerce: null });
  track('begin_checkout', {
    model_profile: model.toLowerCase(),
    order_price: 199,
    currency: 'RUB',
    ...(ecommerce ? { ecommerce } : {})
  });
  purchaseStatus.textContent = 'Демонстрация завершена: платёж и отправка письма не выполняются.';
});

document.querySelector('.training-button')?.addEventListener('click', () => {
  track('trainer_open');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
