function buyOnWhatsApp(productCode) {
    const phoneNumber = "919599308501";
    const message = `Hello, I am interested in buying the product with code: ${productCode}. Please provide more details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Product Filter by Tags
document.addEventListener('DOMContentLoaded', function () {
    const filterTags = document.querySelectorAll('.filter-tag');
    const productCards = document.querySelectorAll('.product-card');

    if (filterTags.length === 0) return; // Exit if no filter tags on page

    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update active state on buttons
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            let visibleCount = 0;
            productCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
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
                        visibleCount++;
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });

            // Show/hide "no products" message
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
