// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery images data
    const galleryImages = [
        {
            src: "image/145.jpg",
            title: "Modern Residential Installation",
            description: "Contemporary garage door with clean lines and premium materials"
        },
        {
            src: "image/148.jpg",
            title: "Professional Repair Service",
            description: "Expert spring replacement and maintenance service"
        },
        {
            src: "image/149.jpg",
            title: "Commercial Installation",
            description: "Heavy-duty commercial overhead door installation"
        },
        {
            src: "image/150.jpg",
            title: "Carriage House Style",
            description: "Traditional design with modern functionality and hardware"
        },
        {
            src: "image/151.jpg",
            title: "Glass Panel Design",
            description: "Modern glass and aluminum construction for natural light"
        },
        {
            src: "image/152.jpg",
            title: "Smart Opener Installation",
            description: "Latest technology garage door opener with smartphone control"
        },
        {
            src: "image/153.jpg",
            title: "Custom Wood Door",
            description: "Handcrafted wooden garage door with custom stain finish"
        },
        {
            src: "image/154.jpg",
            title: "Insulated Steel Door",
            description: "Energy-efficient insulated steel door installation"
        },
        {
            src: "image/155.jpg",
            title: "Decorative Hardware",
            description: "Premium decorative hardware and window accents"
        }
    ];

    // View toggle functionality
    const viewToggle = document.getElementById('viewToggle');
    const carouselView = document.getElementById('carouselView');
    const gridView = document.getElementById('gridView');
    
    if (viewToggle) {
        viewToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Show grid view
                carouselView.classList.add('hidden');
                gridView.classList.remove('hidden');
                populateGridView();
            } else {
                // Show carousel view
                gridView.classList.add('hidden');
                carouselView.classList.remove('hidden');
            }
        });
    }

    // Carousel functionality
    let currentImageIndex = 0;
    const mainImage = document.getElementById('mainImage');
    const leftImage = document.getElementById('leftImage');
    const rightImage = document.getElementById('rightImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateCarousel() {
        if (!mainImage || galleryImages.length === 0) return;

        const current = galleryImages[currentImageIndex];
        const prevIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
        const nextIndex = currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;

        // Update images
        mainImage.style.backgroundImage = `url(${current.src})`;
        if (leftImage) leftImage.style.backgroundImage = `url(${galleryImages[prevIndex].src})`;
        if (rightImage) rightImage.style.backgroundImage = `url(${galleryImages[nextIndex].src})`;

        // Update text
        if (imageTitle) imageTitle.textContent = current.title;
        if (imageDescription) imageDescription.textContent = current.description;
    }

    function nextImage() {
        currentImageIndex = currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;
        updateCarousel();
    }

    function prevImage() {
        currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
        updateCarousel();
    }

    // Event listeners for carousel
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (leftImage) leftImage.addEventListener('click', prevImage);
    if (rightImage) rightImage.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Auto-play carousel (optional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextImage, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play and pause on hover
    if (carouselView) {
        startAutoPlay();
        carouselView.addEventListener('mouseenter', stopAutoPlay);
        carouselView.addEventListener('mouseleave', startAutoPlay);
    }

    // Grid view population
    function populateGridView() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';
        
        galleryImages.forEach((image, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.style.backgroundImage = `url(${image.src})`;
            gridItem.title = image.title;
            
            gridItem.addEventListener('click', function() {
                // Switch to carousel view and show clicked image
                currentImageIndex = index;
                viewToggle.classList.remove('active');
                gridView.classList.add('hidden');
                carouselView.classList.remove('hidden');
                updateCarousel();
            });
            
            galleryGrid.appendChild(gridItem);
        });
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter projects
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize carousel
    updateCarousel();

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselView) {
        carouselView.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselView.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left - next image
            } else {
                prevImage(); // Swipe right - previous image
            }
        }
    }

    // Lightbox functionality (optional enhancement)
    function createLightbox(imageSrc, title, description) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="${title}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }

    // Add lightbox styles
    const lightboxStyles = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }

        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }

        .lightbox-content img {
            max-width: 100%;
            max-height: 70vh;
            border-radius: var(--radius-lg);
        }

        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }

        .lightbox-info {
            color: white;
            margin-top: var(--space-4);
        }

        .lightbox-info h3 {
            font-size: var(--font-size-xl);
            margin-bottom: var(--space-2);
        }
    `;

    // Add lightbox styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);
});