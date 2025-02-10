let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
atualizarCarrinho();

document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Baby Dool Pink", price: 49.90, image: "img/bd1.jpg" },
        { id: 2, name: "Baby Dool S2", price: 49.90, image: "img/bd2.jpg" },
        { id: 3, name: "Baby Dool Meme", price: 49.90, image: "img/bd3.jpg" },
        { id: 4, name: "Baby Dool White", price: 49.90, image: "img/bd4.jpg" },
        { id: 5, name: "Baby Dool Pool", price: 49.90, image: "img/bd5.jpg" },
        { id: 6, name: "Baby Dool Mickey", price: 49.90, image: "img/bd6.jpg" },
    ];

    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Adicionar ao Carrinho
            </button>
        `;
        productList.appendChild(productElement);
    });
});

// Adicionar item ao carrinho
function addToCart(id, name, price) {
    carrinho.push({ id, name, price });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Atualizar exibição do carrinho
function atualizarCarrinho() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)} 
            <button onclick="removerItem(${index})">X</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = carrinho.length;
}

// Remover item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Limpar carrinho
function limparCarrinho() {
    carrinho = [];
    localStorage.removeItem("carrinho");
    atualizarCarrinho();
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada com sucesso! Obrigado por comprar conosco. ❤️");
    limparCarrinho();
}

// Abrir/Fechar carrinho
function toggleCart() {
    const cart = document.getElementById("cart");
    cart.classList.toggle("hidden");
}

// Carregar o carrinho na página do carrinho (carrinho.html)
if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinhoPaginaCarrinho();
}

// Função que carrega os itens do carrinho na página carrinho.html
function carregarCarrinhoPaginaCarrinho() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem("carrinho");
    carregarCarrinhoPaginaCarrinho(); // Atualiza a página de carrinho após limpar
}

// Função para finalizar a compra
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        alert("Compra finalizada com sucesso! Obrigado por comprar conosco. ❤️");
        limparCarrinho(); // Limpa o carrinho após finalizar
    }
}

// Função para redirecionar para a página do carrinho
function irParaCarrinho() {
    window.location.href = "carrinho.html"; // Redireciona para a página do carrinho
}

document.getElementById('finalize-purchase').addEventListener('click', function () {
    // Recupera os itens do carrinho armazenados no localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        alert("O carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra.");
        return;
    }

    // Calcula o total do carrinho
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Inicializa o Mercado Pago com suas credenciais de acesso
    MercadoPago.setPublishableKey('YOUR_PUBLIC_KEY'); // Substitua pela sua chave pública do Mercado Pago

    // Cria o pagamento
    let preference = {
        items: cart.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
        })),
        back_urls: {
            success: 'https://www.seusite.com/success', // URL de sucesso
            failure: 'https://www.seusite.com/failure', // URL de falha
            pending: 'https://www.seusite.com/pending'  // URL de pendente
        },
        auto_return: 'approved'
    };

    MercadoPago.createPreference(preference).then(function(response) {
        // Cria o link de pagamento no Mercado Pago
        let initPoint = response.response.init_point;
        window.location.href = initPoint;  // Redireciona o usuário para a página de pagamento do Mercado Pago
    }).catch(function(error) {
        console.error("Erro ao criar preferência:", error);
        alert("Ocorreu um erro ao tentar processar o pagamento.");
    });
});
