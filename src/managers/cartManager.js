import fs from "fs";
import { v4 as uuid } from "uuid";

let carts = [];
const path = "./src/managers/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(path, "utf-8");
  carts = JSON.parse(cartsJson) || [];

  return carts;
};

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: uuid(),
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(path, JSON.stringify(carts));

  return newCart;
};

const getCartById = async (cid) => {
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const cart = await getCartById(cid);
  console.log(cart.products.product);
  // Modificar para chequear que el producto existe y aumentar la quantity
  const productincart = cart.products.find((p) => p.product === pid);
  if (productincart) {
    productincart.quantity++;
    await fs.promises.writeFile(path, JSON.stringify(carts));
    return cart;
  }

  const product = {
    product: pid,
    quantity: 1,
  };

  cart.products.push(product);
  await fs.promises.writeFile(path, JSON.stringify(carts));
  return cart;
};

export default {
  createCart,
  getCartById,
  addProductToCart,
};
