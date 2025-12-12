import React from "react";

const CartItem = ({ item, onRemove, onChangeQt }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: 8,
        borderRadius: 6,
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: 48, height: 48, objectFit: "contain" }}
      />
      <div style={{}}>
        <div style={{}}>{item.title}</div>
        <div style={{ color: "#666" }}> ${Number(item.price).toFixed(2)} </div>
      </div>
      <div>
        <input
            aria-label="Quantity"
            type="number"
            min='1'
            value={item.quantity || 1}
            onChange={(e) => onChangeQt(Number(e.target.value) || 1)}
            style={{width:60, padding:6, borderRadius:8, border:'1px solid #ddd'}}
        />
        <button className="btn btn-remove" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
