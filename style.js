// Smooth scroll and active nav
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Check if it's an anchor link
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

    // Show/hide back to top button
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

// Lazy-load Pinterest profile embed script when section is near viewport
(function lazyLoadPinterestProfile() {
    const target = document.querySelector('.pinterest .pinterest-profile');
    if (!target) return;
    const loadScript = () => {
        if (document.getElementById('pinterest-script')) return;
        const s = document.createElement('script');
        s.defer = true;
        s.async = true;
        s.src = 'https://assets.pinterest.com/js/pinit.js';
        s.id = 'pinterest-script';
        document.body.appendChild(s);
    };
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            if (entries.some(e => e.isIntersecting)) {
                loadScript();
                obs.disconnect();
            }
        }, { rootMargin: '200px' });
        io.observe(target);
    } else {
        // Fallback for older browsers
        let loaded = false;
        const onScroll = () => {
            if (loaded) return;
            loaded = true;
            loadScript();
            window.removeEventListener('scroll', onScroll);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        setTimeout(() => { if (!loaded) { loaded = true; loadScript(); } }, 3000);
    }
})();

// See More Services Functionality
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const seeMoreContainer = document.querySelector('.see-more-container');

    // Initial state: hide cards after the 6th one
    if (serviceCards.length > 6) {
        serviceCards.forEach((card, index) => {
            if (index >= 6) {
                card.classList.add('hidden');
            }
        });
    } else {
        // If 6 or fewer cards, hide the button container if it exists
        if (seeMoreContainer) {
            seeMoreContainer.style.display = 'none';
        }
    }

    // Click event for "See More" button
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function () {
            serviceCards.forEach(card => {
                card.classList.remove('hidden');
            });
            // Hide the button after showing all services
            if (seeMoreContainer) {
                seeMoreContainer.style.display = 'none';
            }
        });
    }


    // Flower Bouquet Slideshow Logic
    const slideshowContainer = document.getElementById('bouquet-slideshow-container');

    if (slideshowContainer) {

        let slideIndex = 0;
        let autoSlideInterval;

        // Embedded images array (to avoid CORS issues with file:// protocol)
        const bouquetImages = [
            "Karwa-Chauth-gift-flower-bouquet-delivery-ghaziabad.jpg",
            "artificial-purple-flower-with-pot-shop-ghaziabad.jpg",
            "karwachauth-gift-gajra-flower-delivery-service-ghaziabad.jpg",
            "mix-rose-flower-bouquet-instant-delivery-gaur-city.jpg",
            "white-lily-flower-bouquet-same-day-delivery.jpg",
            "white-lily-pink-rose-small-bunch-service.jpg",
            "yellow-lilly-bookey-delivery-in-kavi-nagar-ghaziabad.jpg"
        ];

        initSlideshow(bouquetImages);

        // Initialize Slideshow
        function initSlideshow(bouquetImages) {
            let slidesHtml = '';

            bouquetImages.forEach((img, index) => {
                slidesHtml += `
                <div class="mySlides fade">
                    <img src="flower-bouquet/${img}" alt="Flower Bouquet ${index + 1}">
                </div>
            `;
            });

            slideshowContainer.innerHTML = `
            ${slidesHtml}
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        `;

            showSlides(slideIndex);
            startAutoSlide();
        }

        // Global controls
        window.plusSlides = function (n) {
            showSlides(slideIndex += n);
            resetAutoSlide();
        };

        function showSlides(n) {
            let slides = document.getElementsByClassName("mySlides");

            if (n >= slides.length) { slideIndex = 0 }
            if (n < 0) { slideIndex = slides.length - 1 }

            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            if (slides[slideIndex]) {
                slides[slideIndex].style.display = "flex";
            }
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                plusSlides(1);
            }, 4000); // 4 seconds
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }
}

);
