import React, { useState, useReducer } from "react";
import "./App.css";
import productReducer from "./reducers/productReducer";
import ProductCard from "./components/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  editProduct,
  addBlank,
  addApi,
  addPayload,
} from "./redux/productSlice";
// import payload from './payload.json'

function App() {
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

  const [productState, dispatch] = useReducer(productReducer, initialState);
  const reduxDispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const getData = async () => {
    const response = await fetch("http://localhost:3001/api/products");

    reduxDispatch(addPayload(await response.json()));
  };

  return (
    <div className='App'>
      <h1>Video Game Products</h1>

      <button onClick={() => reduxDispatch(addBlank())}>Add Blank Card</button>

      <button onClick={() => reduxDispatch(addApi())}>ADD API</button>

      {/* <button
      onClick={
        () => dispatch({
          type: "ADD_PAYLOAD",
          payload: payload
        })
      }>Payload</button> */}
      <button onClick={() => getData()}>Payload</button>
      {product.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            publisher={product.publisher}
            genre={product.genre}
            price={product.price}
            //pass in dispatch for DELETE_PRODUCT
            deleteProduct={(id) =>
              reduxDispatch(deleteProduct({ product_id: id }))
            }
            editProduct={(editProductObj) =>
              reduxDispatch(editProduct(editProductObj))
            }
          />
        );
      })}
    </div>
  );
}

export default App;
