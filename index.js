// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

Array.prototype.uniq = function() {
    const newArray = [];
    for(let i = 0; i < this.length; i++) {
        if(!newArray.includes(this[i])) {
            newArray.push(this[i])
        }
    }
    return newArray;
}

class Neighborhood {
    constructor(name) {
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter((delivery) => {
            return delivery.neighborhoodId === this.id;
        })
    }

    ununiqueCustomers() {
        console.log(this.deliveries())
        return this.deliveries().map((delivery) => {
            return delivery.customer();
        })
    }

    customers() {
        return this.ununiqueCustomers().uniq()
    }

    ununiqueMeals() {
        return this.deliveries().map((delivery) => {
            return delivery.meal();
        })
    }

    meals() {
        return this.ununiqueMeals().uniq()
    }
 }

 class Customer {
     constructor(name, neighborhoodId) {
        this.name = name;
        this.id = ++customerId;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
     }

     deliveries() {
         return store.deliveries.filter((delivery) => {
             return delivery.customerId === this.id;
         })
     }

     meals() {
         return this.deliveries().map((delivery) => {
             return delivery.meal();
         })
     }

     totalSpent() {
         const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        //  console.log(this.meals())
         return this.meals().reduce(reducer, 0)
     }
 }

 class Meal {
     constructor(title, price) {
         this.title = title;
         this.price = price;
         this.id = ++mealId;
         store.meals.push(this);
     }


     deliveries() {
         return store.deliveries.filter((delivery) => {
            return delivery.mealId === this.id
         })
     }

     customers() {
         return this.deliveries().map((delivery) => {
             return delivery.customer();
         })
     }

     static byPrice() {
         
         return store.meals.sort(function(a, b) {
             return b.price - a.price;
         })
     }


 }

 class Delivery {
     constructor(mealId, neighborhoodId, customerId) {
         this.mealId = mealId;
         this.neighborhoodId = neighborhoodId;
         this.customerId = customerId;
         this.id = ++deliveryId;
         store.deliveries.push(this);
     }

     meal() {
         return store.meals.find((meal) => {
             return meal.id === this.mealId;
         })
     }

     customer() {
         return store.customers.find((customer) => {
             return customer.id === this.customerId;
         })
     }

     neighborhood() {
         return store.neighborhoods.find((neighborhood) => {
            return neighborhood.id === this.neighborhoodId;
         })
     }
 }