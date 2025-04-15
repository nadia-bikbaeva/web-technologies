const pizzaData = {
  'Пепперони': { price: 600, cal: 350 },
  'Маргарита': { price: 500, cal: 300 },
  'Баварская': { price: 700, cal: 450 }
};

const sizeData = {
  'маленькая': { price: 0, cal: 0 },
  'большая': { price: 200, cal: 150 }
};

let selectedPizza = null;
let selectedSize = 'маленькая';
let selectedAddons = [];

const updateCart = () => {
  if (!selectedPizza) {
    document.getElementById('cartButton').textContent = 'Выберите пиццу';
    return;
  }

  const base = pizzaData[selectedPizza];
  const size = sizeData[selectedSize];

  let price = base.price + size.price;
  let cal = base.cal + size.cal;

  selectedAddons.forEach(addon => {
    price += parseInt(addon.dataset.price);
    cal += parseInt(addon.dataset.cal);
  });

  document.getElementById('cartButton').textContent = `Добавить в корзину за ${price}₽ (${cal} Ккал)`;
};

document.querySelectorAll('.pizza-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.pizza-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    selectedPizza = option.dataset.type;
    updateCart();
  });
});

document.querySelectorAll('input[name="size"]').forEach(input => {
  input.addEventListener('change', () => {
    selectedSize = input.value;
    updateCart();
  });
});

document.querySelectorAll('.addon').forEach(addon => {
  addon.addEventListener('click', () => {
    addon.classList.toggle('selected');
    if (selectedAddons.includes(addon)) {
      selectedAddons = selectedAddons.filter(a => a !== addon);
    } else {
      selectedAddons.push(addon);
    }
    updateCart();
  });
});