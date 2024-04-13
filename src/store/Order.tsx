import { produce } from "immer";
import { create } from "zustand";

interface IProduct {
  id: string;
  name: string;
  img: string;
  color: string;
  quantity: number;
  maxQuantity: number;
  price: number;
}

interface IOrderState {
  products: IProduct[];
  totalPrice: number;
  incProduct: (i: number) => void;
  decProduct: (i: number) => void;
  addProduct: (product: IProduct) => void;
  removeProducts: () => void;
}

const useOrderStore = create<IOrderState>()((set) => ({
  products: [],
  totalPrice: 0,

  incProduct: (i: number) =>
    set(
      produce((state: IOrderState) => {
        state.totalPrice += state.products[i].price;
        ++state.products[i].quantity;
      })
    ),

  decProduct: (i: number) =>
    set(
      produce((state: IOrderState) => {
        state.totalPrice -= state.products[i].price;
        if (state.products[i].quantity > 1) --state.products[i].quantity;
        else state.products = state.products.filter((_, index) => index !== i);
      })
    ),

  addProduct: (newProduct: IProduct) =>
    set(
      produce((state: IOrderState) => {
        const length = state.products.filter(
          (product) =>
            product.color === newProduct.color && product.id === newProduct.id
        ).length;
        if (length === 0) {
          state.totalPrice += newProduct.price * newProduct.quantity;
          state.products = [...state.products, newProduct];
        } else {
          state.products.map((product) => {
            if (
              product.color === newProduct.color &&
              product.id === newProduct.id
            ) {
              const oldSubTotalPrice = product.quantity * product.price;
              product.quantity += newProduct.quantity;
              product.maxQuantity = newProduct.maxQuantity;
              if (product.quantity > product.maxQuantity) {
                product.quantity = product.maxQuantity;
              }
              state.totalPrice =
                state.totalPrice -
                oldSubTotalPrice +
                product.price * product.quantity;
            }
          });
        }
      })
    ),
  removeProducts: () =>
    set(
      produce((state: IOrderState) => {
        state.products = [];
        state.totalPrice = 0;
      })
    ),
}));

export default useOrderStore;
