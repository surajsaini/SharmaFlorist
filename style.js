// Smooth scroll and active nav
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Highlight nav on scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 80;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Back to top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// See More Services Functionality
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('#services .service-card');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const seeMoreContainer = document.querySelector('.see-more-container');

    if (seeMoreBtn && seeMoreContainer) {
        if (serviceCards.length > 6) {
            serviceCards.forEach((card, index) => {
                if (index >= 6) {
                    card.classList.add('hidden');
                }
            });
        } else {
            seeMoreContainer.style.display = 'none';
        }
    }

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function () {
            serviceCards.forEach(card => {
                card.classList.remove('hidden');
            });
            if (seeMoreContainer) {
                seeMoreContainer.style.display = 'none';
            }
        });
    }
});

// Month Tile Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const monthTiles = document.querySelectorAll('.month-tile .about-header');

    monthTiles.forEach(header => {
        header.addEventListener('click', function () {
            const parentTile = this.parentElement;
            const content = parentTile.querySelector('.about-content');

            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.offsetHeight;
                content.style.maxHeight = '0px';
                content.classList.remove('active');
                parentTile.classList.remove('active');
            } else {
                content.classList.add('active');
                parentTile.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});

// Reusable Load More
function initLoadMore(containerSel, itemSel, batchSize) {
    const container = document.querySelector(containerSel);
    if (!container) return;

    let visibleCount = batchSize;

    const btn = document.createElement('button');
    btn.className = 'load-more-btn';
    btn.textContent = 'Load More';
    container.parentElement.insertBefore(btn, container.nextSibling);

    function applyLoadMore() {
        const items = container.querySelectorAll(itemSel);
        let shown = 0;

        items.forEach(item => {
            if (item.classList.contains('filter-hidden')) {
                item.style.display = 'none';
                return;
            }

            shown++;
            if (shown <= visibleCount) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        btn.style.display = shown > visibleCount ? '' : 'none';
    }

    btn.addEventListener('click', function () {
        visibleCount += batchSize;
        applyLoadMore();
    });

    document.addEventListener('loadmore-reset', function () {
        visibleCount = batchSize;
        applyLoadMore();
    });

    applyLoadMore();
}

// Auto-init on pages that have a [data-loadmore] container
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-loadmore]').forEach(function (container) {
        const batchSize = parseInt(container.dataset.loadmore, 10) || 12;
        const itemSel = container.dataset.loadmoreItem || ':scope > *';
        initLoadMore('#' + container.id, itemSel, batchSize);
    });
});
