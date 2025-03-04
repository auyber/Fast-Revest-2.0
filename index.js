document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".scroll-image");
    

    const checkVisibility = () => {
        images.forEach((image) => {
            const imageBox = image.parentElement;
            const imageBoxTop = imageBox.getBoundingClientRect().top;
            const imageBoxBottom = imageBox.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;
            const middleOfViewport = viewportHeight / 2;

            if (imageBoxTop <= middleOfViewport && imageBoxBottom >= middleOfViewport) {
                image.classList.add("visible");
                imageBox.style.backgroundColor = "var(--primary)";
            } else {
                image.classList.remove("visible");
                imageBox.style.backgroundColor = "transparent";
            }
        });
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    // Atualiza automaticamente a versão do CSS para evitar cache
    const link = document.querySelector("link[rel='stylesheet']");
    if (link) {
        const url = new URL(link.href);
        url.searchParams.set("v", Date.now());
        link.href = url.toString();
    }

    // Carrossel de imagens
    const slides = document.querySelectorAll('.carousel-slides img');
    const totalSlides = slides.length;
    let slideIndex = 0;
    const intervalTime = 5000;

    function showSlide(index) {
        if (index >= totalSlides) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = totalSlides - 1;
        } else {
            slideIndex = index;
        }
        document.querySelector('.carousel-slides').style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    function showNextSlide() {
        showSlide(slideIndex + 1);
    }

    function showPrevSlide() {
        showSlide(slideIndex - 1);
    }

    document.querySelector('.next').addEventListener('click', showNextSlide);
    document.querySelector('.prev').addEventListener('click', showPrevSlide);

    setInterval(showNextSlide, intervalTime);
});


