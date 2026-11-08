window.dataLayer = window.dataLayer || [];

function track(event, params = {}) {
  window.dataLayer.push({ event, ...params });
}

const purchaseDialog = document.querySelector('#purchase-dialog');
const purchaseForm = document.querySelector('#purchase-form');
const purchaseTitle = document.querySelector('#purchase-title');
const purchaseModel = document.querySelector('#purchase-model');
const purchasePrice = document.querySelector('#purchase-price');
const purchaseSubmit = document.querySelector('#purchase-submit');
const purchaseStatus = document.querySelector('#purchase-status');

document.querySelector('[data-model="balanced"]')?.addEventListener('click', () => {
  track('app_download_from_models', { model_profile: 'balanced' });
});

document.querySelectorAll('.purchase-button').forEach((button) => {
  button.addEventListener('click', () => {
    const model = button.dataset.model;
    const price = button.dataset.price;

    purchaseDialog.dataset.model = model;
    purchaseTitle.textContent = `Модель ${model}`;
    purchaseModel.textContent = model;
    purchasePrice.textContent = price;
    purchaseSubmit.textContent = `Перейти к оплате — ${price}`;
    purchaseForm.reset();
    purchaseStatus.textContent = '';
    purchaseDialog.showModal();
    document.querySelector('#purchase-email').focus();

    track('model_purchase_open', { model_profile: model.toLowerCase() });
  });
});

document.querySelector('.purchase-close')?.addEventListener('click', () => {
  purchaseDialog.close();
});

purchaseDialog?.addEventListener('click', (event) => {
  if (event.target === purchaseDialog) purchaseDialog.close();
});

purchaseForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const model = purchaseDialog.dataset.model || 'unknown';

  track('model_purchase_demo_submit', { model_profile: model.toLowerCase() });
  purchaseStatus.textContent = 'Демонстрация завершена: платёж и отправка письма не выполняются.';
});

document.querySelector('.training-button')?.addEventListener('click', () => {
  track('model_trainer_open_demo');
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
