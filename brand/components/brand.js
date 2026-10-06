/* Framework-free progressive enhancement. No network requests, dependencies or storage. */
document.querySelectorAll('[data-bj-configurator]').forEach(root => {
  const image = root.querySelector('[data-bj-product-image]');
  const selected = root.querySelector('[data-bj-finish-name]');
  root.addEventListener('change', event => {
    if (!event.target.matches('input[data-bj-finish]')) return;
    const input = event.target;
    if (image) {
      image.src = input.dataset.image;
      image.alt = `Big Jo’s mattress and matching base in ${input.value}, styled in a bedroom. Concept render; headboard and accessories shown for styling.`;
    }
    if (selected) selected.textContent = input.value;
    document.querySelectorAll('[data-bj-enquiry-link]').forEach(link => {
      const url = new URL(link.href);
      url.searchParams.set('finish', input.value.toLowerCase());
      link.href = url.href;
    });
  });
});

const requestedFinish = new URLSearchParams(window.location.search).get('finish');
if (requestedFinish === 'flax' || requestedFinish === 'charcoal') {
  const label = requestedFinish === 'flax' ? 'Flax' : 'Charcoal';
  const radio = document.querySelector(`input[data-bj-finish][value="${label}"]`);
  if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
  const contactFinish = document.querySelector('#enquiry-finish');
  if (contactFinish) contactFinish.value = requestedFinish;
}
document.querySelectorAll('[data-bj-contact-preview]').forEach(form => {
  form.addEventListener('submit', event => event.preventDefault());
});

document.querySelectorAll('[data-bj-demo-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const email = form.querySelector('[type=email]');
    const error = form.querySelector('[data-bj-error]');
    const status = form.querySelector('[data-bj-status]');
    status.textContent = '';
    const valid = email.validity.valid;
    email.setAttribute('aria-invalid', String(!valid));
    error.hidden = valid;
    if (!valid) { email.focus(); return; }
    status.textContent = 'Example complete. No information has been sent or saved.';
  });
});
