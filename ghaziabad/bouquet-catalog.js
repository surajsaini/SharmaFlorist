(function () {
    'use strict';

    const filters = document.getElementById('filterTags');
    const buttons = Array.from(filters.querySelectorAll('[data-filter]'));
    const cards = Array.from(document.querySelectorAll('#bouquet-grid .product-card'));
    const status = document.getElementById('filter-status');
    const emptyMessage = document.getElementById('no-products-message');
    const searchableCards = cards.map(function (card) {
        return {
            element: card,
            tags: Array.from(card.querySelectorAll('.tag')).map(function (tag) {
                return tag.textContent.toLowerCase();
            }),
            title: card.querySelector('.product-title').textContent.toLowerCase()
        };
    });

    function applyFilter(button) {
        const filter = button.dataset.filter.toLowerCase();
        let count = 0;

        searchableCards.forEach(function (card) {
            const matches = filter === 'all' || card.tags.some(function (tag) {
                return tag.includes(filter);
            }) || (filter === 'rose' && card.title.includes('rose'));
            card.element.hidden = !matches;
            if (matches) count++;
        });

        buttons.forEach(function (candidate) {
            const selected = candidate === button;
            candidate.classList.toggle('active', selected);
            candidate.setAttribute('aria-pressed', String(selected));
        });

        status.textContent = count + (count === 1 ? ' bouquet' : ' bouquets') +
            (filter === 'all' ? '' : ' — ' + button.textContent.trim());
        emptyMessage.hidden = count !== 0;
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () { applyFilter(button); });
    });
    filters.hidden = false;

    function revealLinkedProduct() {
        let id;
        try {
            id = decodeURIComponent(window.location.hash.slice(1));
        } catch (_) {
            return;
        }
        const card = cards.find(function (candidate) { return candidate.id === id; });
        if (!card) return;
        if (card.hidden) applyFilter(buttons.find(function (button) { return button.dataset.filter === 'all'; }));
        window.requestAnimationFrame(function () {
            card.scrollIntoView({ block: 'start', behavior: 'instant' });
        });
    }

    window.addEventListener('hashchange', revealLinkedProduct);
    revealLinkedProduct();

    // Image links still open the original photo if dialog support is unavailable.
    const dialog = document.createElement('dialog');
    if (typeof dialog.showModal !== 'function') return;
    dialog.className = 'catalog-lightbox';
    dialog.setAttribute('aria-label', 'Product photo');

    const container = document.createElement('div');
    container.className = 'lightbox-container';
    const image = document.createElement('img');
    image.className = 'lightbox-image';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'lightbox-close';
    close.setAttribute('aria-label', 'Close photo');
    close.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    container.append(image, close);
    dialog.appendChild(container);
    document.body.appendChild(dialog);

    let opener;
    let previousOverflow;
    document.querySelectorAll('.product-image-link').forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            opener = link;
            image.src = link.href;
            image.alt = link.querySelector('img').alt;
            previousOverflow = document.body.style.overflow;
            dialog.showModal();
            document.body.style.overflow = 'hidden';
            close.focus();
        });
    });

    close.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () {
        document.body.style.overflow = previousOverflow;
        image.removeAttribute('src');
        if (opener) opener.focus({ preventScroll: true });
    });
})();
