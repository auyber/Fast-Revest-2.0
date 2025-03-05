document.addEventListener("DOMContentLoaded", function () {
    // ------------------------- FUNÇÃO PARA ATUALIZAR O CSS E EVITAR CACHE -------------------------
    function updateCSSVersion() {
        const link = document.querySelector("link[rel='stylesheet']");
        if (link) {
            const url = new URL(link.href);
            url.searchParams.set("v", Date.now()); // Adiciona o timestamp ao parâmetro 'v'
            link.href = url.toString(); // Atualiza o link do CSS
        }
    }

    // ------------------------- ANIMAÇÃO DAS IMAGENS -------------------------
    const images = document.querySelectorAll(".scroll-image");

    function checkVisibility() {
        const viewportHeight = window.innerHeight;
        const middleOfViewport = viewportHeight / 2;

        images.forEach((image) => {
            const imageBox = image.parentElement;
            const { top, bottom } = imageBox.getBoundingClientRect();

            // Verifica se a imagem está visível
            const isVisible = top <= middleOfViewport && bottom >= middleOfViewport;
            image.classList.toggle("visible", isVisible);
            imageBox.style.backgroundColor = isVisible ? "var(--primary)" : "transparent";
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Chama ao carregar a página

    // ------------------------- CARROSSEL DE IMAGENS -------------------------
    const slidesContainer = document.querySelector(".carousel-slides");
    const slides = document.querySelectorAll(".carousel-slides img");
    const totalSlides = slides.length;
    let slideIndex = 0;
    const intervalTime = 5000;
    let autoSlideInterval;

    function showSlide(index) {
        slideIndex = (index + totalSlides) % totalSlides; // Loop infinito
        slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    function showNextSlide() {
        showSlide(slideIndex + 1);
    }

    function showPrevSlide() {
        showSlide(slideIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(showNextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    document.querySelector(".next")?.addEventListener("click", () => {
        showNextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    document.querySelector(".prev")?.addEventListener("click", () => {
        showPrevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    startAutoSlide(); // Inicia o slide automático

    // ------------------------- ROLOU SUAVE PARA ANCORAS -------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede que a URL mude

            // Rola suavemente até a seção correspondente
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Atualiza a versão do CSS para forçar o cache
    updateCSSVersion();
});
