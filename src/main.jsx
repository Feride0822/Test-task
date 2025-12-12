import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CartList from './cart/CartList'

const container = document.getElementById('cart-root');
const root = createRoot(container);
root.render(<CartList/>);
