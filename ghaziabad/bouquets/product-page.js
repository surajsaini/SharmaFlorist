(function () {
    'use strict';

    const gallery = document.getElementById('product-gallery');
    const slides = gallery ? Array.from(gallery.querySelectorAll('.gallery-slide')) : [];
    const thumbnails = Array.from(document.querySelectorAll('[data-gallery-index]'));
    const currentPhoto = document.getElementById('current-photo');
    const previousButton = document.querySelector('.gallery-arrow-prev');
    const nextButton = document.querySelector('.gallery-arrow-next');
    let activeIndex = 0;

    function updateGalleryState(index) {
        activeIndex = Math.max(0, Math.min(index, slides.length - 1));

        if (currentPhoto) {
            currentPhoto.textContent = String(activeIndex + 1);
        }

        thumbnails.forEach(function (thumbnail, thumbnailIndex) {
            const isActive = thumbnailIndex === activeIndex;
            thumbnail.classList.toggle('is-active', isActive);
            if (isActive) {
                thumbnail.setAttribute('aria-current', 'true');
            } else {
                thumbnail.removeAttribute('aria-current');
            }
        });
    }

    function showSlide(index) {
        if (!gallery || slides.length === 0) return;

        const wrappedIndex = (index + slides.length) % slides.length;
        gallery.scrollTo({
            left: slides[wrappedIndex].offsetLeft,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
        updateGalleryState(wrappedIndex);
    }

    if (gallery && slides.length > 0) {
        let scrollTimer;

        gallery.addEventListener('scroll', function () {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(function () {
                const galleryLeft = gallery.getBoundingClientRect().left;
                const closestIndex = slides.reduce(function (closest, slide, index) {
                    const distance = Math.abs(slide.getBoundingClientRect().left - galleryLeft);
                    return distance < closest.distance ? { index: index, distance: distance } : closest;
                }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
                updateGalleryState(closestIndex);
            }, 80);
        }, { passive: true });

        gallery.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                showSlide(activeIndex - 1);
            }
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                showSlide(activeIndex + 1);
            }
        });

        previousButton.addEventListener('click', function () {
            showSlide(activeIndex - 1);
        });

        nextButton.addEventListener('click', function () {
            showSlide(activeIndex + 1);
        });

        thumbnails.forEach(function (thumbnail) {
            thumbnail.addEventListener('click', function () {
                showSlide(Number(thumbnail.dataset.galleryIndex));
            });
        });
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const shareUrl = canonicalLink ? canonicalLink.href : window.location.href;
    const shareTitle = '50 Pink Rose Grand Bouquet – ₹1,500';
    const shareText = 'See this 50 Pink Rose Grand Bouquet from Rose N Petals.';
    const nativeShareButton = document.getElementById('native-share');
    const copyLinkButton = document.getElementById('copy-link');
    const shareStatus = document.getElementById('share-status');
    let statusTimer;

    function announceShareStatus(message) {
        if (!shareStatus) return;
        window.clearTimeout(statusTimer);
        shareStatus.textContent = message;
        statusTimer = window.setTimeout(function () {
            shareStatus.textContent = '';
        }, 2500);
    }

    if (nativeShareButton && navigator.share) {
        nativeShareButton.hidden = false;
        nativeShareButton.addEventListener('click', function () {
            navigator.share({ title: shareTitle, text: shareText, url: shareUrl })
                .catch(function (error) {
                    if (error.name !== 'AbortError') {
                        announceShareStatus('Sharing was unavailable.');
                    }
                });
        });
    }

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand('copy');
        textArea.remove();
        return copied;
    }

    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', function () {
            const copyPromise = navigator.clipboard && window.isSecureContext
                ? navigator.clipboard.writeText(shareUrl).then(function () { return true; })
                : Promise.resolve(fallbackCopy(shareUrl));

            copyPromise
                .then(function (copied) {
                    announceShareStatus(copied ? 'Link copied!' : 'Could not copy link.');
                })
                .catch(function () {
                    announceShareStatus('Could not copy link.');
                });
        });
    }
})();
