import React, { use, useEffect, useState } from "react";
import CartItem from "./CartItem";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    return [];
  }
}

const CartList = () => {
  const [cart, setCart] = useState(() => readCart());

  useEffect(() => {
    const handler = () => setCart(readCart());
    window.addEventListener("cart-update", handler);
    return () => window.removeEventListener("cart-update", handler);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function removeItem(id) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }

  function changeQuantity(id, newQt) {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, newQt) } : p
      )
    );
  }

  const totalItem = cart.reduce((s, p) => s + (p.quantity || 0), 0);
  const totalPrice = cart.reduce(
    (s, p) => s + (p.quantity || 0) * Number(p.price),
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      <div style={{marginBottom:10}}>
        Items: {totalItem} - Total Price: ${totalPrice.toFixed(2)}
      </div>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
              onChangeQt={(q) => changeQuantity(item.id, q)}
            />
          ))}
          <div style={{marginTop: 10}}>
            <button className="btn btn-remove" onClick={()=>{ setCart([]); }}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
