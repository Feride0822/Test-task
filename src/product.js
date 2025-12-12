const API = 'https://fakestoreapi.com/products';
const productsTake = document.getElementById('products');

function takeCartFromBase(){
    try{
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }catch(e) {return []; }
}

function saveCartToStorage(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-update'));
}

function addToCart(product){
    const cart = takeCartFromBase();
    const existingp = cart.find(p => p.id === product.id);
    if(existingp){
        existingp.quantity = (existingp.quantity || 1) + 1;
    } else {
        const p = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            quantity: 1

        };
        cart.push(p);
    }
    saveCartToStorage(cart);
}
// Products card
function createCard(product){
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
  
    const title = document.createElement('div');
    title.className = 'product-title';
    title.textContent = product.title;

    const description = document.createElement('div');
    description.className = 'product-description';
    description.textContent = product.description;
  
    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;

    const btn = document.createElement('button');
    btn.className = 'btn btn-add';
    btn.textContent = 'Add to cart';
    btn.addEventListener('click', () => {
        addToCart(product);
        btn.textContent = 'Successfully added';
        setTimeout(() => btn.textContent = 'Add to cart', 900);
    })

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    const action = document.createElement('div');
    action.style.marginTop = 'auto';
    action.appendChild(btn);
    card.appendChild(action);

    return card;
}

async function loadProducts(){
    productsTake.innerHTML = '<p>Loading products</p>';
    try{
        const connec = await fetch(API);
        if(!connec.ok) throw new Error('Network error');
        const products = await connec.json();
        productsTake.innerHTML = '';
        products.forEach(element => {
            const c = createCard(element);
            productsTake.appendChild(c);
        });

    } catch(error){
        productsTake.innerHTML = `<p style="color:red">Failed to load products ${error.message}</p> `;
    }
}


document.addEventListener('DOMContentLoaded', loadProducts);