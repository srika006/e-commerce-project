import React from "react";
import Productitems from "./ProductItems";

function ProductList(props) {
  const { productList } = props;

  return (
    <>
      {productList == null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {productList.map((product) => (
            <Productitems key={product.id} product={product}></Productitems>
          ))}
        </>
      )}
    </>
  );
}

export default ProductList;
