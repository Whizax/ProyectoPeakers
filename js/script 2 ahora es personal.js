var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});
document.querySelectorAll('.carousel-cell').forEach(cell => {
    const indicator = cell.querySelector('.drag-indicator');

    cell.addEventListener('mousemove', e => {
        const rect = cell.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        indicator.style.left = `${x}px`;
        indicator.style.top = `${y}px`;
    });

    cell.addEventListener('mouseenter', () => {
        indicator.style.opacity = '1';
    });

    cell.addEventListener('mouseleave', () => {
        indicator.style.opacity = '0';
    });
});

const initDarkMode = () => {
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (!darkModeBtn) return;
    
    const darkModeText = document.querySelector('.dark-mode-text');
    
    // Verificar preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeText.textContent = 'Claro';
    }
    
    // Evento click
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        darkModeText.textContent = isNowDark ? 'Claro' : 'Oscuro';
        localStorage.setItem('darkMode', isNowDark);
        
        // Efecto visual
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
};

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', initDarkMode);