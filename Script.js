document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const closeChatbotBtn = document.querySelector('.close-btn');

    // Manually added data (placeholder for a real database)
    const stores = [
        {
            name: "Furniture Emporium",
            type: "Furniture",
            reviews: 4.8,
            distance: 2.5,
            products: ["Sofa", "Dining Table", "Chair"],
            services: "Free delivery & assembly"
        },
        {
            name: "Tech Hub Electronics",
            type: "Digital electronics",
            reviews: 4.5,
            distance: 1.2,
            products: ["Smartphone", "Laptop", "Headphones"],
            services: "After-sale support & repairs"
        },
        {
            name: "Footwear Frenzy",
            type: "Shoes",
            reviews: 4.2,
            distance: 5.0,
            products: ["Sneakers", "Boots", "Sandals"],
            services: "Custom fitting"
        },
        {
            name: "Timekeeper Watches",
            type: "Watch",
            reviews: 4.9,
            distance: 0.8,
            products: ["Smartwatch", "Analog Watch", "Luxury Watch"],
            services: "Battery replacement, band resizing"
        },
        {
            name: "Gadget Galaxy",
            type: "Smartphone",
            reviews: 4.7,
            distance: 3.1,
            products: ["iPhone", "Samsung Galaxy", "Google Pixel"],
            services: "Trade-in offers, data transfer"
        },
        {
            name: "Home Decor Haven",
            type: "Home decor",
            reviews: 4.6,
            distance: 2.9,
            products: ["Art Prints", "Vases", "Lamps"],
            services: "Interior design consultation"
        },
        {
            name: "The Stationery Store",
            type: "Stationary",
            reviews: 4.4,
            distance: 1.5,
            products: ["Notebooks", "Pens", "Art Supplies"],
            services: "Custom printing"
        },
        {
            name: "The Daily Grind Cafe",
            type: "Restaurant",
            reviews: 4.1,
            distance: 0.5,
            products: ["Coffee", "Sandwiches", "Pastries"],
            services: "Catering"
        },
        {
            name: "The Beverage Bar",
            type: "Beverage",
            reviews: 4.3,
            distance: 2.0,
            products: ["Juices", "Smoothies", "Tea"],
            services: "Party packs"
        },
        {
            name: "Fashion Forward",
            type: "Clothes",
            reviews: 4.0,
            distance: 4.5,
            products: ["Shirts", "Jeans", "Dresses"],
            services: "Alterations"
        }
    ];

    function renderStores(filteredStores) {
        resultsContainer.innerHTML = ''; // Clear previous results
        if (filteredStores.length === 0) {
            resultsContainer.innerHTML = '<p>No results found. Please try a different search.</p>';
            return;
        }

        filteredStores.forEach(store => {
            const card = document.createElement('div');
            card.classList.add('store-card');
            card.innerHTML = `
                <h4>${store.name}</h4>
                <p><strong>Category:</strong> ${store.type}</p>
                <p><strong>Reviews:</strong> ${store.reviews} / 5</p>
                <p><strong>Distance:</strong> ${store.distance} km</p>
                <p><strong>Services:</strong> ${store.services}</p>
            `;
            resultsContainer.appendChild(card);
        });
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredStores = stores.filter(store =>
            store.name.toLowerCase().includes(query) ||
            store.type.toLowerCase().includes(query) ||
            store.products.some(product => product.toLowerCase().includes(query))
        );
        renderStores(filteredStores);
        chatbotContainer.classList.add('active'); // Show chatbot after search
    });

    // Chatbot functionality
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    closeChatbotBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = message;
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll to the bottom
    }

    sendButton.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, 'user');
            chatInput.value = '';

            // This is a simple, placeholder "bot" response.
            // In a real application, this would send the message to your backend.
            setTimeout(() => {
                let botResponse = "I have forwarded your request to the relevant shopkeepers. They will get back to you shortly.";
                addMessageToChat(botResponse, 'bot');
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
