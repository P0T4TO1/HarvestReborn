import { IProductoOrden, BagType } from "@/interfaces";
import { BagState } from "./";

type BagAction =
  | {
      type: "LOAD_BAG";
      payload: BagType;
    }
  | { type: "UPDATE_PRODUCTS_IN_BAG"; payload: BagType }
  | { type: "CHANGE_BAG_QUANTITY"; payload: IProductoOrden }
  | { type: "REMOVE_PRODUCT"; payload: IProductoOrden }
  | { type: "CLEAR_BAG"; payload: BagType }
  | {
      type: "UPDATE_ORDER_SUMMARY";
      payload: {
        numberOfProducts: number;
        total: number;
      };
    }
  | { type: "ORDER_COMPLETED" };

export const bagReducer = (state: BagState, action: BagAction): BagState => {
  switch (action.type) {
    case "LOAD_BAG":
      return {
        ...state,
        isLoaded: true,
        bag: [...action.payload, ...state.bag],
      };
    case "UPDATE_PRODUCTS_IN_BAG":
      return {
        ...state,
        bag: [...action.payload],
      };
    case "CHANGE_BAG_QUANTITY":
      return {
        ...state,
        bag: state.bag.map((item) => {
          item.productos = item.productos.map((product) => {
            if (
              product.id_producto === action.payload.id_producto &&
              product.lote?.inventario.id_negocio ===
                action.payload.lote?.inventario.id_negocio
            ) {
              product.cantidad_orden = action.payload.cantidad_orden;
              product.monto = action.payload.monto;
            }
            return product;
          });
          return item;
        }) as BagType,
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        bag: state.bag.map((item) => {
          item.productos = item.productos.filter(
            (product) =>
              product.id_producto !== action.payload.id_producto ||
              product.lote?.inventario.id_negocio !==
                action.payload.lote?.inventario.id_negocio
          );
          return item;
        }) as BagType,
      };
    case "UPDATE_ORDER_SUMMARY":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_BAG":
      return {
        ...state,
        bag: action.payload,
        numberOfProducts: 0,
        total: 0,
      };
    case "ORDER_COMPLETED":
      return {
        ...state,
        bag: [],
        numberOfProducts: 0,
        total: 0,
      };
    default:
      return state;
  }
};
