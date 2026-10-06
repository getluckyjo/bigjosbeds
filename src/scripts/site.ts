/**
 * Progressive enhancement only: every page works without this script.
 * - Product configurator: announce finish/item changes, keep the URL and enquiry links in sync,
 *   and preselect from ?finish= / ?item= (CSS :has() already swaps images and prices).
 * - Forms: show a busy state while submitting and prevent double submits.
 */

for (const root of document.querySelectorAll<HTMLElement>('[data-bj-config]')) {
  const finishName = root.querySelector<HTMLElement>('[data-bj-finish-name]');
  const params = new URLSearchParams(window.location.search);

  const select = (name: string, value: string | null) => {
    if (!value) return;
    const input = root.querySelector<HTMLInputElement>(`input[name="${name}"][value="${CSS.escape(value)}"]`);
    if (input) input.checked = true;
  };
  select('finish', params.get('finish'));
  select('item', params.get('item'));

  const sync = (updateUrl: boolean) => {
    const finish = root.querySelector<HTMLInputElement>('input[name="finish"]:checked');
    const item = root.querySelector<HTMLInputElement>('input[name="item"]:checked');
    if (!finish) return;
    if (finishName) finishName.textContent = finish.dataset.label ?? finish.value;
    for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-bj-enquiry-link]')) {
      const url = new URL(link.href);
      url.searchParams.set('finish', finish.value);
      link.href = url.href;
    }
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('finish', finish.value);
      if (item) url.searchParams.set('item', item.value);
      history.replaceState(null, '', url);
    }
  };
  sync(false);
  root.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'finish' || target.name === 'item') sync(true);
  });
}

for (const form of document.querySelectorAll<HTMLFormElement>('form[data-bj-busy]')) {
  form.addEventListener('submit', (event) => {
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!button) return;
    if (button.getAttribute('aria-busy') === 'true') {
      event.preventDefault();
      return;
    }
    button.setAttribute('aria-busy', 'true');
    if (button.dataset.busyLabel) button.textContent = button.dataset.busyLabel;
  });
}

// Restore buttons if the page is shown again from the back/forward cache.
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  for (const button of document.querySelectorAll<HTMLButtonElement>('button[aria-busy="true"]')) {
    button.removeAttribute('aria-busy');
    if (button.dataset.label) button.textContent = button.dataset.label;
  }
});

// Move focus to an error summary or confirmation rendered by the server.
document.querySelector<HTMLElement>('[data-bj-focus]')?.focus();
