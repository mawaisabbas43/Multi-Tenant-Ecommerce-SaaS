"use strict";

const config = require("../config/secret");

class Cart {
  static addToCart(product = null, qty = 1, vari = null, cart) {
    let format = new Intl.NumberFormat(config.locale.lang, {
      style: "currency",
      currency: config.locale.currency
    });
    let updated = false;
    if (!this.inCart(product._id, vari, cart)) {
      let prod = {
        id: product._id,
        fname: product.fname,
        price: product.price,
        qty: qty,
        image: product.images[0],
        variant: vari,
        subTotal: format.format(product.price * qty),
        formattedPrice: format.format(product.price)
      };
      cart.items.push(prod);
      this.calculateTotals(cart);
    } else {
      cart.items.forEach(item => {
        if (
          item.id.toString() == product._id &&
          vari.name == item.variant.name &&
          vari.option == item.variant.option
        ) {
          if (qty > 0) {
            item.qty += qty;
            item.subTotal = format.format(item.price * item.qty);
            updated = true;
          }
        }
      });
      if (updated) {
        this.calculateTotals(cart);
      }
    }
  }

  static removeFromCart(id = 0, vari, cart) {
    for (let i = 0; i < cart.items.length; i++) {
      let item = cart.items[i];
      if (
        item.id == id &&
        vari.name == item.variant.name &&
        vari.option == item.variant.option
      ) {
        cart.items.splice(i, 1);
        this.calculateTotals(cart);
      }
    }
  }

  static updateCart(ids = [], qtys = [], variantNames, variOptions, cart) {
    let map = [];
    let updated = false;
    let format = new Intl.NumberFormat(config.locale.lang, {
      style: "currency",
      currency: config.locale.currency
    });

    for (let i = 0; i < ids.length; i++) {
      map.push({
        id: ids[i],
        qty: parseInt(qtys[i], 10),
        variant: { name: variantNames[i], option: variOptions[i] }
      });
    }
    map.forEach(obj => {
      cart.items.forEach(item => {
        if (
          item.id == obj.id &&
          obj.variant.name == item.variant.name &&
          obj.variant.option == item.variant.option
        ) {
          if (obj.qty > 0 && obj.qty !== item.qty) {
            item.qty = obj.qty;
            item.subTotal = format.format(item.price * item.qty);
            updated = true;
          }
        }
      });
    });
    if (updated) {
      this.calculateTotals(cart);
    }
  }

  static inCart(productID = 0, vari = null, cart) {
    let found = false;
    cart.items.forEach(item => {
      if (
        item.id.toString() == productID.toString() &&
        vari.name == item.variant.name &&
        vari.option == item.variant.option
      ) {
        found = true;
      }
    });
    return found;
  }

  static calculateTotals(cart) {
    cart.totals = 0.0;
    cart.items.forEach(item => {
      let price = item.price;
      let qty = item.qty;
      let amount = price * qty;

      cart.totals += amount;
    });
    this.setFormattedTotals(cart);
  }

  static emptyCart(request) {
    let format = new Intl.NumberFormat(config.locale.lang, {
      style: "currency",
      currency: config.locale.currency
    });
    if (request.session) {
      request.session.cart.items = [];
      request.session.cart.totals = 0.0;
      request.session.cart.formattedTotals = format.format(
        request.session.cart.totals
      );
    }
  }

  static setFormattedTotals(cart) {
    let format = new Intl.NumberFormat(config.locale.lang, {
      style: "currency",
      currency: config.locale.currency
    });
    let totals = cart.totals;
    cart.formattedTotals = format.format(totals);
  }
}

module.exports = Cart;
