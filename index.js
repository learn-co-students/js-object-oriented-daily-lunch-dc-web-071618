// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(c => c.neighborhoodId === this.id);
  }

  meals() {
    const allMeals = this.deliveries().map(d => d.meal());
    return [...new Set(allMeals)];
  }
}

let customerId = 0;

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(d => d.meal());
  }

  totalSpent() {
    return this.meals().reduce((total, m) => {
      return total + m.price;
    }, 0)
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(d => d.customer());
  }
}

let deliveryId = 0;

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(m => m.id === this.mealId);
  }

  customer() {
    return store.customers.find(c => c.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}
