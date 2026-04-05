// FLICKITY CAROUSEL
const initCarousel = () => {
    const elem = document.querySelector('.main-carousel') || document.querySelector('.carousel');
    if (!elem) return;

    new Flickity(elem, {
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        pageDots: true,
        prevNextButtons: true
    });

    // Drag indicator
    document.querySelectorAll('.carousel-cell').forEach(cell => {
        const indicator = cell.querySelector('.drag-indicator');
        if (!indicator) return;

        cell.addEventListener('mousemove', e => {
            const rect = cell.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            indicator.style.left = `${x}px`;
            indicator.style.top = `${y}px`;
        });

        cell.addEventListener('mouseenter', () => indicator.style.opacity = '1');
        cell.addEventListener('mouseleave', () => indicator.style.opacity = '0');
    });
};
// SLIDERS (configuración y audio)
const initSliders = () => {
    const sliders = document.querySelectorAll(".slider-input");
    sliders.forEach(slider => {
        const sliderId = slider.dataset.id;
        const progressBar = slider.nextElementSibling;
        const sliderValue = slider.closest('.control-item')?.querySelector(`.sliderValue[data-id="${sliderId}"]`);
        if (!slider || !progressBar || !sliderValue) return;

        // Inicializar valores
        progressBar.value = slider.value;
        sliderValue.textContent = sliderId === 'sensitivity' ? parseFloat(slider.value).toFixed(1) : parseInt(slider.value);

        slider.addEventListener("input", function() {
            const currentValue = this.closest('.control-item')?.querySelector(`.sliderValue[data-id="${sliderId}"]`);
            if (!currentValue) return;

            this.nextElementSibling.value = this.value;
            currentValue.textContent = sliderId === 'sensitivity' ? parseFloat(this.value).toFixed(1) : parseInt(this.value);
        });
    });

    // Progress bars generales (si existen)
    const progressBars = document.querySelectorAll(".progress");
    progressBars.forEach(bar => {
        const percent = bar.dataset.percent;
        if (percent) bar.style.width = percent + "%";
    });
};
// DARK MODE
const initDarkMode = () => {
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (!darkModeBtn) return;

    const darkModeText = document.querySelector('.dark-mode-text');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeText) darkModeText.textContent = 'Claro';
    }

    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        if (darkModeText) darkModeText.textContent = isNowDark ? 'Claro' : 'Oscuro';
        localStorage.setItem('darkMode', isNowDark);

        // Efecto visual
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = '', 200);
    });
};
// BOTONES (efecto visual)
const initButtons = () => {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            if (this.classList.contains("btn-primary")) {
                this.style.backgroundColor = "#ffffff";
                this.style.color = "#0d0c0b";
                setTimeout(() => {
                    this.style.backgroundColor = "";
                    this.style.color = "";
                }, 200);
            }
        });
    });
};
// MAP SLIDER (mundo.html)
const initMapSlider = () => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slideContainer = document.querySelector('.slide');
    if (!next || !prev || !slideContainer) return;

    next.addEventListener('click', () => {
        const items = document.querySelectorAll('.mapaimg');
        if (items.length) slideContainer.appendChild(items[0]);
    });

    prev.addEventListener('click', () => {
        const items = document.querySelectorAll('.mapaimg');
        if (items.length) slideContainer.prepend(items[items.length - 1]);
    });
};
// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
    initCarousel();
    initSliders();
    initDarkMode();
    initButtons();
    initMapSlider();
});