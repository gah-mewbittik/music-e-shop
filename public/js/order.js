const userId = document.getElementById('hidden-user-id').value;
console.log('user id is: ', userId);
const orderHandler = async (event) => {
    event.preventDefault();
    try {
        const res1 = await fetch('/api/cart');
        const cartData = await res1.json();
        console.log('cartData: ', cartData);
        const products = cartData.map(x => { return { id: x.pid, quantity: x.quantity } });
        console.log('products: ', products);
        const res2 = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId, products: products })
        });
        const confirmData = await res2.json();
        console.log(confirmData);
    }
    catch (err) {
        // TODO display an error message to the user 
    }
};

document.querySelector('.order-form').addEventListener('submit', orderHandler);