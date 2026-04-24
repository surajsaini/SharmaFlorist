

function buyOnWhatsApp(productCode) {
    const phoneNumber = "919599308501";
    const productLink = `https://sharmaflorist.com/ghaziabad/order-flower-bouquet-online.html#${productCode}`;
    const message = `Hello, I am interested in buying the product with code: ${productCode}.\n\nProduct Link: ${productLink}\n\nPlease provide more details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

const WHATSAPP_BUTTON_ICON = '<svg class="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>';
const DEFAULT_FLOATING_WHATSAPP_TEXT = 'Order Now on WhatsApp';

function createFloatingWhatsAppButton(phoneNumber, text, ariaLabel) {
    const link = document.createElement('a');
    const iconWrapper = document.createElement('div');
    const textSpan = document.createElement('span');

    link.href = `https://wa.me/${phoneNumber}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'whatsapp-btn';
    link.setAttribute('aria-label', ariaLabel);

    iconWrapper.innerHTML = WHATSAPP_BUTTON_ICON;
    link.appendChild(iconWrapper.firstElementChild);

    textSpan.className = 'whatsapp-text';
    textSpan.textContent = text;
    link.appendChild(textSpan);

    return link;
}

function initFloatingWhatsAppButtons() {
    document.querySelectorAll('[data-floating-whatsapp]').forEach(function (placeholder) {
        const phoneNumber = placeholder.dataset.whatsappPhone || '919599308501';
        const text = DEFAULT_FLOATING_WHATSAPP_TEXT;
        const ariaLabel = placeholder.dataset.whatsappAriaLabel || 'Contact us on WhatsApp';
        const button = createFloatingWhatsAppButton(phoneNumber, text, ariaLabel);

        placeholder.replaceWith(button);
    });
}

const FLOATING_PETAL_THEMES = {
    'mothers-day': {
        svgs: [
            '<svg width="28" height="28" viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="8" ry="14" fill="#f8bbd0"/><ellipse cx="14" cy="8" rx="4" ry="7" fill="#e91e63" opacity="0.2"/></svg>',
            '<svg width="24" height="24" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="6" ry="10" fill="#fce4ec"/><ellipse cx="12" cy="7" rx="3" ry="5" fill="#c2185b" opacity="0.18"/></svg>',
            '<svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="5" ry="8" fill="#f48fb1"/><ellipse cx="10" cy="5" rx="2.5" ry="4" fill="#880e4f" opacity="0.12"/></svg>',
            '<svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 2 C6 2, 2 7, 2 11 C2 16, 7 20, 11 20 C15 20, 20 16, 20 11 C20 7, 16 2, 11 2 Z" fill="#f8bbd0" opacity="0.7"/><circle cx="11" cy="8" r="3" fill="#e91e63" opacity="0.15"/></svg>'
        ]
    },
    'rose-day': {
        svgs: [
            '<svg width="28" height="28" viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="8" ry="14" fill="#f8e1e7"/><ellipse cx="14" cy="8" rx="4" ry="7" fill="#e3c6f7"/></svg>',
            '<svg width="24" height="24" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="6" ry="10" fill="#ffcdd2"/><ellipse cx="12" cy="7" rx="3" ry="5" fill="#d32f2f" opacity="0.2"/></svg>',
            '<svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="5" ry="8" fill="#fff0f5"/><ellipse cx="10" cy="5" rx="2.5" ry="4" fill="#c62828" opacity="0.15"/></svg>'
        ]
    },
    'valentines-day': {
        svgs: [
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ff1744"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="#d50000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="#ff5252"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
        ]
    }
};

function initFloatingPetals(themeName) {
    const config = FLOATING_PETAL_THEMES[themeName];
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!config || !Array.isArray(config.svgs) || config.svgs.length === 0 || !isMobile) {
        return;
    }

    let lastPetalTime = 0;
    let lastScrollTime = 0;
    let scrollTimeout;

    function createPetal() {
        const now = Date.now();
        if (now - lastPetalTime < 100) return;
        lastPetalTime = now;

        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = config.svgs[Math.floor(Math.random() * config.svgs.length)];
        petal.style.left = (Math.random() * window.innerWidth) + 'px';
        petal.style.top = '-30px';
        petal.style.animationDuration = (3 + Math.random() * 2) + 's';

        document.body.appendChild(petal);

        setTimeout(function () {
            petal.remove();
        }, 5000);
    }

    window.addEventListener('scroll', function () {
        const now = Date.now();
        if (now - lastScrollTime < 200) return;
        lastScrollTime = now;

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(function () {
            const count = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < count; i++) {
                setTimeout(createPetal, i * 100);
            }
        }, 100);
    }, { passive: true });
}

// Product Filter by Tags
document.addEventListener('DOMContentLoaded', function () {
    initFloatingWhatsAppButtons();

    const filterTags = document.querySelectorAll('.filter-tag');
    const productCards = document.querySelectorAll('.product-card');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterTags.length === 0) return; // Exit if no filter tags on page

    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update active state on buttons
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            let visibleCount = 0;

            // Filter product cards (for bouquet page)
            if (productCards.length > 0) {
                productCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        card.classList.remove('filter-hidden');
                        visibleCount++;
                    } else {
                        // Check if any tag in the product matches the filter
                        const productTags = card.querySelectorAll('.product-tags .tag');
                        let hasMatch = false;
                        productTags.forEach(productTag => {
                            if (productTag.textContent.toLowerCase().includes(filter.toLowerCase())) {
                                hasMatch = true;
                            }
                        });

                        if (hasMatch) {
                            card.classList.remove('hidden');
                            card.classList.remove('filter-hidden');
                            visibleCount++;
                        } else {
                            card.classList.add('hidden');
                            card.classList.add('filter-hidden');
                        }
                    }
                });

                // Show/hide "no products" message for product grid
                let noProductsMsg = document.querySelector('.no-products-message');
                if (visibleCount === 0) {
                    if (!noProductsMsg) {
                        noProductsMsg = document.createElement('div');
                        noProductsMsg.className = 'no-products-message';
                        noProductsMsg.textContent = 'No products found for this filter. Try "All" to see all products.';
                        document.querySelector('.product-grid').appendChild(noProductsMsg);
                    }
                    noProductsMsg.style.display = 'block';
                } else if (noProductsMsg) {
                    noProductsMsg.style.display = 'none';
                }
            }

            // Filter gallery items (for gallery page)
            if (galleryItems.length > 0) {
                visibleCount = 0;
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                        item.classList.remove('filter-hidden');
                        visibleCount++;
                    } else {
                        // Check if data-tags contains the filter
                        const itemTags = item.dataset.tags || '';
                        if (itemTags.toLowerCase().includes(filter.toLowerCase())) {
                            item.classList.remove('hidden');
                            item.classList.remove('filter-hidden');
                            visibleCount++;
                        } else {
                            item.classList.add('hidden');
                            item.classList.add('filter-hidden');
                        }
                    }
                });

                // Show/hide "no items" message for gallery
                let noItemsMsg = document.querySelector('.no-items-message');
                if (visibleCount === 0) {
                    if (!noItemsMsg) {
                        noItemsMsg = document.createElement('div');
                        noItemsMsg.className = 'no-products-message no-items-message';
                        noItemsMsg.textContent = 'No photos found for this filter. Try "All" to see all photos.';
                        document.querySelector('.masonry-grid').appendChild(noItemsMsg);
                    }
                    noItemsMsg.style.display = 'block';
                } else if (noItemsMsg) {
                    noItemsMsg.style.display = 'none';
                }
            }

            // Reset Load More when filter changes
            document.dispatchEvent(new Event('loadmore-reset'));
        });
    });

    // Image Lightbox Popup
    initLightbox();
});

// Lightbox functionality
function initLightbox() {
    // Create lightbox overlay if it doesn't exist
    if (!document.querySelector('.lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-container">
                <img class="lightbox-image" src="" alt="Product Image">
                <button class="lightbox-close" aria-label="Close">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Close on overlay click (outside image)
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeLightbox();
            }
        });

        // Close button click
        overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    }

    // Add click listeners to all product images
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(img => {
        img.addEventListener('click', function () {
            openLightbox(this.src, this.alt);
        });
    });

    // Add click listeners to all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const overlay = document.querySelector('.lightbox-overlay');
    const image = overlay.querySelector('.lightbox-image');

    image.src = src;
    image.alt = alt || 'Product Image';

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    overlay.classList.add('active');
}

function closeLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');

    // Restore body scroll
    document.body.style.overflow = '';

    overlay.classList.remove('active');
}
