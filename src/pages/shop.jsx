import 'react'
import { useState } from 'react';
import './shop.css';
import products from '../data/products';

const Shop = () => {
  const [cart, setCart] = useState([]);
  const imageLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-KDZI0c6UrnABL4d3mT8yUQEYqsLBbeIwA&usqp=CAU";

  function handleAddItem(id) {
    let isInArray = false;
    let indexInArray = -1;
    cart.map((product, index) => {
      if (product.id === id) {
        isInArray = true;
        indexInArray = index;
      }
    })
    if (isInArray) {
      let newArr = [...cart];
      newArr[indexInArray].qty += 1;
      newArr[indexInArray].total = newArr[indexInArray].prize * newArr[indexInArray].qty;
      setCart(newArr);
    } else {
      setCart([...cart, products[id]])
    }
  }

  function handleMinusItem(id) {
    let indexInArray = -1;
    cart.map((product, index) => {
      if (product.id === id) {
        indexInArray = index;
      }
    })
    let newArr = [...cart];
    if (newArr[indexInArray].qty > 1) {
      newArr[indexInArray].qty -= 1;
      newArr[indexInArray].total = newArr[indexInArray].prize * newArr[indexInArray].qty;
    } else {
      newArr.pop(indexInArray);
    }
      setCart(newArr);

  }

  return (
    <div>
      <div className="shop">
        <h1>Carrito de Compras</h1>
        {products.map((item, index) => (
          <div className="product">
            <h1>{item.name}</h1>
            <img src={imageLink} />
            <br></br>
            <button onClick={() => { handleAddItem(item.id) }}>Añadir producto</button>
          </div>
        ))}
      </div>
      <div className="list">
        <table>
          <tbody>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
            {cart.map((item, index) => {
              return (
                <tr key={`row${index}`}>
                  <td key={`column0item${index}`}>{item.name}</td>
                  <td key={`column1item${index}`}>
                    {item.prize}
                  </td>
                  <td key={`column2item${index}`}>
                    {item.qty}
                  </td>
                  <td key={`column4item${index}`}>
                    {item.total}
                  </td>
                  <td><button onClick={() => { handleMinusItem(item.id) }} >-</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Shop;