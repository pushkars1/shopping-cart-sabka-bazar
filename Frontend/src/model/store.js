const { fetchAPIData } = require("../helper");

export const state = {
  categories: [],
  products: [],
  cart: [],
  buttonsDOM: [],
  cartTotal: 0,
  cartCount: 0,
  auth: {
    loggedIn: false,
    userDetails: {}
  },
};

export const loadCategories = async function () {
  try {
    const data = await fetchAPIData("/home");
    state.categories = data;
  } catch (err) {
    throw err;
  }
};

export const loadProducts = async function () {
  try {
    const data = await fetchAPIData("/products/allproducts");
    state.products = data;
  } catch (err) {
    throw err;
  }
};

export const loadProductsByCategory = async function (id) {
  try {
    const data = await fetchAPIData(/products/ + id);
    state.products = data;
  } catch (err) {
    throw err;
  }
};

export const loadProductByID = async function (id) {
  try {
    const data = await fetchAPIData(`/products/product/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
}
