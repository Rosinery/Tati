
        function toggleCart() {
            const cart = document.getElementById("cart");
            cart.classList.toggle("hidden");
        }

        document.addEventListener("DOMContentLoaded", function() {
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
                    <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                `;
                productList.appendChild(productElement);
            });
        });
