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

