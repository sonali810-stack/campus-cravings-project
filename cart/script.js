// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4AB6OKHTicA0arr5MrES5dqq2VstXrgM",
    authDomain: "campus-cravings-c4327.firebaseapp.com",
    databaseURL: "https://campus-cravings-c4327-default-rtdb.firebaseio.com",
    projectId: "campus-cravings-c4327",
    storageBucket: "campus-cravings-c4327.appspot.com",
    messagingSenderId: "737267139561",
    appId: "1:737267139561:web:9101743d1917b0c86a0178",
    measurementId: "G-BD5KZZ2LD9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch and display menu items
const menuContainer = document.getElementById('menuContainer');
database.ref('/menuItems').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const menuItem = childSnapshot.val();
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${menuItem.imageUrl}" alt="${menuItem.itemName}">
            <h2>${menuItem.itemName}</h2>
            <p>${menuItem.description}</p>
            <span class="price">$${menuItem.price.toFixed(2)}</span>
            <button onclick="addToCart('${childSnapshot.key}')">Add to Cart</button>
        `;
        menuContainer.appendChild(card);
    });
});

// Function to redirect to cart page
function redirectToCart() {
    window.location.href = 'cart.html';
}

// Function to add item to cart
function addToCart(itemId) {
    const cartRef = database.ref(`cart/${itemId}`);
    cartRef.transaction((item) => {
        return item ? item + 1 : 1;
    });
}

// Function to process payment
function payNow() {
    // Placeholder function, implement your payment logic here
    alert('Payment processed successfully!');
}
