document.addEventListener('DOMContentLoaded', function () {
  const typeSelect = document.getElementById('filter-type');
  const locationSelect = document.getElementById('filter-location');
  const priceSelect = document.getElementById('filter-price');
  const propertyGrid = document.getElementById('property-grid');

  if (!propertyGrid) {
    return;
  }

  const cards = Array.from(propertyGrid.querySelectorAll('.property-card'));

  function filterProperties() {
    const typeValue = typeSelect.value;
    const locationValue = locationSelect.value;
    const priceValue = priceSelect.value;

    cards.forEach(card => {
      const matchesType = typeValue === 'all' || card.dataset.type === typeValue;
      const matchesLocation = locationValue === 'all' || card.dataset.location === locationValue;
      const price = parseInt(card.dataset.price, 10);
      let matchesPrice = true;

      if (priceValue !== 'all') {
        const [min, max] = priceValue.split('-').map(Number);
        matchesPrice = price >= min && price <= max;
      }

      card.style.display = matchesType && matchesLocation && matchesPrice ? '' : 'none';
    });
  }

  [typeSelect, locationSelect, priceSelect].forEach(select => {
    select.addEventListener('change', filterProperties);
  });

  filterProperties();
});
