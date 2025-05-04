class Pizza {
    static TYPES = {
    'Маргарита': { price: 500, calories: 300 },
    'Пиперине': { price: 800, calories: 400 },
    'Баварская': { price: 700, calories: 450 }
    };

    static SIZES = {
    'маленькая': { price: 100, calories: 100 },
    'большая': { price: 200, calories: 200 }
    };

    static TOPPINGS = {
    'сливочная моцарелла': { price: 50, calories: 20 },
    'сырный борт': {
        маленькая: { price: 150, calories: 50 },
        большая: { price: 300, calories: 50 }
    },
    'чедер и пармезан': {
        маленькая: { price: 150, calories: 50 },
        большая: { price: 300, calories: 50 }
    }
    };

    constructor(type, size) {
    if (!Pizza.TYPES[type]) throw new Error('Неверный тип пиццы');
    if (!Pizza.SIZES[size]) throw new Error('Неверный размер пиццы');

    this.type = type;
    this.size = size;
    this.toppings = [];
    }

    addTopping(topping) {
    if (!Pizza.TOPPINGS[topping]) throw new Error('Неверная добавка');
    if (!this.toppings.includes(topping)) {
        this.toppings.push(topping);
    }
    }

    removeTopping(topping) {
    this.toppings = this.toppings.filter(t => t !== topping);
    }

    getToppings() {
    return this.toppings;
    }

    getSize() {
    return this.type;
    }

    getStuffing() {
    return this.size;
    }

    calculatePrice() {
    let price = Pizza.TYPES[this.type].price + Pizza.SIZES[this.size].price;

    for (let topping of this.toppings) {
        const toppingInfo = Pizza.TOPPINGS[topping];
        if (typeof toppingInfo.price !== 'undefined') {
        price += toppingInfo.price;
        } else {
        price += toppingInfo[this.size].price;
        }
    }

    return price;
    }

    calculateCalories() {
    let calories = Pizza.TYPES[this.type].calories + Pizza.SIZES[this.size].calories;

    for (let topping of this.toppings) {
        const toppingInfo = Pizza.TOPPINGS[topping];
        if (typeof toppingInfo.calories !== 'undefined') {
        calories += toppingInfo.calories;
        } else {
        calories += toppingInfo[this.size].calories;
        }
    }

    return calories;
    }
}

// === Пример использования ===
const myPizza = new Pizza('Баварская', 'большая');
myPizza.addTopping('сливочная моцарелла');
myPizza.addTopping('сырный борт');
console.log('Пицца:', myPizza.getSize());
console.log('Размер:', myPizza.getStuffing());
console.log('Добавки:', myPizza.getToppings().join(', '));
console.log('Цена:', myPizza.calculatePrice(), 'руб.');
console.log('Калории:', myPizza.calculateCalories(), 'Ккал.');