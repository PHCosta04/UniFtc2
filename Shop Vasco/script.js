const products = [
    { id: 1, name: 'Camisa Kappa Vasco I Juvenil 2024 Roberto Dinamite', price: 339.90, img: '', sizes: ['P', 'M', 'G', 'GG'] },
    { id: 2, name: 'Camisa Vasco Oficial III 2023 Kappa Juvenil - Camisas Negras', price: 299.00, img: '', sizes: ['P', 'M', 'G', 'GG'] },
    { id: 3, name: 'Camisa Vasco Oficial III 2023 Kappa Juvenil - Camisas Negras', price: 349.90, img: '', sizes: ['P', 'M', 'G', 'GG'] },
    { id: 4, name: 'Camisa Vasco Oficial III 2024 - 100 anos Resposta Histórica Kappa Masculina Preta', price: 349.90, img: '', sizes: ['P', 'M', 'G', 'GG'] }
];

// Função para carregar os produtos
function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpar a lista antes de recarregar

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-3', 'product-card');
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">R$ ${product.price.toFixed(2)}</p>

                    <!-- Seletor de Tamanho -->
                    <div>
                        <label for="size-select-${product.id}">Escolha o Tamanho</label>
                        <select id="size-select-${product.id}" class="form-select">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    
                    <!-- Botão de Adicionar ao Carrinho -->
                    <button class="btn btn-primary mt-2" onclick="addToCart(${product.id})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.getElementById(`size-select-${productId}`);
    const selectedSize = sizeSelect.value;  // Pega o tamanho selecionado

    if (!selectedSize) {
        alert('Por favor, selecione o tamanho antes de adicionar ao carrinho!');
        return;
    }

    // Carregar o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar se o produto já está no carrinho
    const existingProduct = cart.find(item => item.id === productId && item.size === selectedSize);
    if (existingProduct) {
        existingProduct.quantity += 1; // Se já estiver, só aumenta a quantidade
    } else {
        cart.push({ ...product, quantity: 1, size: selectedSize });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Salvar no localStorage
    updateCart(); // Atualizar visualização do carrinho
}

// Função para atualizar o carrinho na tela
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = ''; // Limpar carrinho
    let totalPrice = 0;
    let itemCount = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            ${item.name} (Tamanho: ${item.size}) x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Carregar os produtos e carrinho ao iniciar
loadProducts();
updateCart();
