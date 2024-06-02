// Simulated cart data  
let cartData = [];  
let cartTotal = 0;  
  
// Update cart total  
function updateCartTotal() {  
    cartTotal = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0);  
    $('#cart-total').text(cartTotal.toFixed(2));  
}  
  
// Add product to cart  
function addToCart(productId, productName, productPrice, quantity) {  
    let existingItem = cartData.find(item => item.id === productId);  
    if (existingItem) {  
        existingItem.quantity += quantity;  
    } else {  
        cartData.push({ id: productId, name: productName, price: productPrice, quantity: quantity });  
    }  
    updateCartItems();  
    updateCartTotal();  
}  
  
// Update cart item list  
function updateCartItems() {  
    let cartItemsHtml = cartData.map(item => `<li>${item.quantity} x ${item.name} - 
$$
{(item.price * item.quantity).toFixed(2)}</li>`).join('');  
    $('#cart-items').html(cartItemsHtml);  
}  
  
// Initialize cart event listeners  
$(document).ready(function() {  
    $('.add-to-cart-btn').on('click', function() {  
        let $this = $(this);  
        let $productBox = $this.closest('.product-box');  
        let productId = $productBox.data('product-id');  
        let productName = $productBox.data('product-name');  
        let productPrice = parseFloat($productBox.data('product-price'));  
        let quantity = parseInt($productBox.find('.quantity-input').val(), 10);  
  
        if (quantity > 0) {  
            addToCart(productId, productName, productPrice, quantity);  
            $productBox.find('.quantity-input').val(0); // Reset quantity input  
        }  
    });  
  
    $('#checkout').on('click', function() {
        if (cartData.length > 0) {  
            alert('Checkout process simulated. Total: $' + cartTotal.toFixed(2));  
              
        } else {  
            alert('Cart is empty.');  
        }  
    });
    });



    function removeFromCart(productId) {  
        cartData = cartData.filter(item => item.id !== productId);  
        updateCartItems();  
        updateCartTotal();  
         
        $('.remove-from-cart-btn').prop('disabled', true);  
         
        cartData.forEach(item => {  
            $(`[data-product-id="${item.id}"] .remove-from-cart-btn`).prop('disabled', false);  
        });  
    }  
      
      
    function updateRemoveButtons() {  
        $('.product-box').each(function() {  
            let productId = $(this).data('product-id');  
            let hasProduct = cartData.some(item => item.id === productId);  
            $(this).find('.remove-from-cart-btn').prop('disabled', !hasProduct);  
        });  
    }  
      
      
    function clearCart() {  
        cartData = [];  
        updateCartItems();  
        updateCartTotal();  
          
        $('.remove-from-cart-btn').prop('disabled', true);  
    }  
      
      
    $(document).ready(function() {  
        
      
         
        $('.remove-from-cart-btn').on('click', function() {  
            let $this = $(this);  
            let $productBox = $this.closest('.product-box');  
            let productId = $productBox.data('product-id');  
            removeFromCart(productId);  
        });  
      
         
        $('#clear-cart').on('click', function() {  
            clearCart();  
        });  
      
         
        $('#products').on('click', '.add-to-cart-btn', function() {  
             
            updateRemoveButtons();  
        });  
    });  