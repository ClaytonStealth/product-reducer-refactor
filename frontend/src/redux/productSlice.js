import { createSlice } from "@reduxjs/toolkit;";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: uuidv4(),
    title: "Hogwart's Legacy",
    publisher: "Warner Bros.",
    genre: "Adventure",
    price: 59.99,
  },
  {
    id: uuidv4(),
    title: "Destiny 2",
    publisher: "Bungie",
    genre: "FPS",
    price: 29.99,
  },
  {
    id: uuidv4(),
    title: "The Last of Us",
    publisher: "Sony",
    genre: "Adventure",
    price: 69.99,
  },
  {
    id: uuidv4(),
    title: "Total War: Warhammer III",
    publisher: "Sega",
    genre: "Strategy",
    price: 49.99,
  },
  {
    id: uuidv4(),
    title: "Dune",
    publisher: "Warner Bros.",
    genre: "Sci-Fi",
    price: 19.99,
  },
];
export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    deleteProduct: (state, action) => {
      let filteredArr = state.filter((product) =>
        product.id === action.product_id ? false : true
      );
      return filteredArr;
    },
    editProduct: (state, action) => {
      let productCopy = state.map((product) =>
        product.id === action.data.id ? action.data : product
      );
      return productCopy;
    },
    addBlank: (state, action) => {
      let newProduct = {
        id: uuidv4(),
        title: "",
        publisher: "",
        genre: "",
        price: 0.0,
      };
      return [newProduct, ...state];
    },
    addApi: (state, action) => {
      return [...state, action.payload];
    },
    addPayload: (state, action) => {
      console.log(action.payload);
      let payloadArr = action.payload.map((e) => {
        return {
          id: uuidv4(),
          title: e.gameTitle,
          publisher: e.publisherName,
          genre: e.genre,
          price: e.MSRP,
        };
      });
      return [...payloadArr, ...state];
    },
  },
});

export const { deleteProduct, editProduct, addBlank, addApi, addPayload } =
  productSlice.actions;

export default productSlice.reducer;
