const btnConfirm = document.getElementById('btn-confirm');

const userId = document.getElementById('hidden-user-id').value;
console.log('user id is: ', userId);

let container = document.querySelector('#co-alert-container');

btnConfirm.addEventListener('click',  async (event) => {
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

        container.innerHTML = 
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
        Order successfully processed!
            <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">
                
            </button>
        </div>`;
        const closeBtn = container.querySelector('.btn-close');

            closeBtn.addEventListener('click', function(){
                const alert = this.closest('.alert');
                if(alert){
                    alert.style.display = 'none';
                    console.log('Alert is closed');
                }
            })

    }
    catch (err) {
        // TODO display an error message to the user , alert, fix button and add script for order.handlebars
        console.error('Error Processing order:', err);
    }
});

document.querySelector('.order-form').addEventListener('submit', orderHandler);