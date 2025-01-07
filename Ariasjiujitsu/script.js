document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll("img");
        let currentIndex = 0;
        let interval;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove("active", "inactive");
                if (i === index) {
                    img.classList.add("active");
                } else {
                    img.classList.add("inactive");
                }
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function startCarousel() {
            interval = setInterval(nextImage, 4000);
        }

        function stopCarousel() {
            clearInterval(interval);
        }

        carousel.addEventListener("mouseenter", () => {
            stopCarousel();

            const activeIndex = [...images].findIndex((img) =>
                img.classList.contains("active")
            );
            const currentOpacity = parseFloat(
                getComputedStyle(images[activeIndex]).opacity
            );

            if (currentOpacity > 0.5) {
                showImage(activeIndex);
            } else {
                const nextIndex = (activeIndex + 1) % images.length;
                showImage(nextIndex);
            }
        });

        carousel.addEventListener("mouseleave", startCarousel);

        showImage(currentIndex);
        startCarousel();
    });
});
