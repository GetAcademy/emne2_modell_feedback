// VIEW
const view = {
  viewState: {
    itemOrder: {
      isOrdered: true,
    },
  },
};

// MODEL
const model = {
  products: [
    { id: 1, name: "Kaffe, vanlig", price: 40, stock: 100 },
    { id: 2, name: "Kaffe latte", price: 60, stock: 50 },
    { id: 3, name: "Baguett", price: 30, stock: 20 },
  ],

  basket: {
    id: 101,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
    ],

    getTotalPrice: function () {
      return this.items.reduce((total, item) => {
        const product = model.products.find((p) => p.id === item.productId);
        return total + product.price * item.quantity;
      }, 0);
    },
  },

  // History of completed orders
  orders: [
    {
      orderId: 1,
      items: [1, 3], // IDs of products
      pickupTime: "0930",
      status: "klar",
    },
  ],
};

// CONTROLLER
const controller = {
  addToBasket: function (productId) {
    const product = model.products.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      model.basket.items.push({ productId: product.id, quantity: 1 });
      view.updateView(model.basket);
    }
  },

  completeOrder: function () {
    const newOrder = {
      orderId: Date.now(),
      items: model.basket.items,
      pickupTime: new Date().toLocaleTimeString(),
      status: "klar",
    };

    model.orders.push(newOrder);
    model.basket.items = [];
    sendSMS("Your order is ready!");
  },
};

function updateOrderStatus() {}
function sendSMS() {}
function createNewProduct() {}
