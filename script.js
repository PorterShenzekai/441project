var registeredUser = null; 
  
    function showPage(pageId) {  
        
        var pages = document.querySelectorAll('.page');  
        pages.forEach(function(page) {  
            page.classList.remove('active');  
        });  
          
        document.getElementById(pageId).classList.add('active');  
    }  
  
    function registerUser() {  
        var username = document.getElementById("registerUsername").value;  
        var password = document.getElementById("registerPassword").value;  
        registeredUser = { username: username, password: password }; 
        alert("Registration successful! Please log in.");  
         
        showPage('loginPage');  
    }  
  
    function login() {  
        var loginUsername = document.getElementById("loginUsername").value;  
        var loginPassword = document.getElementById("loginPassword").value;  
        if (registeredUser && registeredUser.username === loginUsername && registeredUser.password === loginPassword) {  
              
            showPage('shoppingPage');  
        } else {  
            alert("Invalid username or password. Please try again.");  
        }  
    }  


let cartData = [];
        let cartTotal = 0;

        function updateCartTotal() {
            cartTotal = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0);
            $('#cart-total').text(cartTotal.toFixed(2));
        }

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

        function removeFromCart(productId) {
            cartData = cartData.filter(item => item.id !== productId);
            updateCartItems();
            updateCartTotal();
        }

        function updateCartItems() {
            let cartItemsHtml = cartData.map(item => `
                <li>
                    ${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-from-cart-item-btn" data-product-id="${item.id}">Remove</button>
                </li>`).join('');
            $('#cart-items').html(cartItemsHtml);
        }

        function clearCart() {
            cartData = [];
            updateCartItems();
            updateCartTotal();
        }

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
                    $productBox.find('.quantity-input').val(0); 
                }
            });

            $('#checkout').on('click', function() {
                if (cartData.length > 0) {
                    alert('Checkout process simulated. Total: $' + cartTotal.toFixed(2));
                } else {
                    alert('Cart is empty.');
                }
            });

            $('#cart').on('click', '.remove-from-cart-item-btn', function() {
                let productId = $(this).data('product-id');
                removeFromCart(productId);
            });

            $('#clear-cart').on('click', function() {
                clearCart();
            });
        });