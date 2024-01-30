// index.js

// Import necessary Firebase modules
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiRIPC8QvOZQGeMEF2sP6uruXoTggFRsE",
    authDomain: "ccc-library-system.firebaseapp.com",
    projectId: "ccc-library-system",
    storageBucket: "ccc-library-system.appspot.com",
    messagingSenderId: "319826207112",
    appId: "1:319826207112:web:05afc7f940382326541a3d",
    measurementId: "G-VVLGDHLTTV"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

function fetchBorrowData() {
    // Reference to the 'ccc-library-borrow-data' collection
    const borrowDataCollection = collection(db, 'ccc-library-app-borrow-data');

    // Attach an event listener to listen for changes in the data
    onSnapshot(borrowDataCollection, (querySnapshot) => {
        // Clear existing content
        document.getElementById('txtPlaceholder').innerHTML = '';

        // Iterate through the query snapshot to get each document's data
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Display the data on the website
            document.getElementById('txtPlaceholder').innerHTML += `
                <p>userID: ${data.userID} | Book Name: ${data.modelBookName} | Author: ${data.modelBookAuthor} | Borrower: ${data.modelBorrower} | Status: ${data.modelBorrowStatus} | Book code: ${data.modelBookCode} | Genre: ${data.modelBookGenre} | Borrow date: ${data.modelBorrowDate} | Borrow status: ${data.modelBorrowStatus} | Borrow deadline: ${data.modelBorrowDeadline} | Program: ${data.modelProgram} | Section: ${data.modelSection}, Year: ${data.modelYear}</p>
            `;
            console.log(`Book Name: ${data.modelBookName}, Author: ${data.modelBookAuthor}`);
        });
    });
}

// Initial fetch when the page loads
fetchBorrowData();

// Function to automatically update the content when the database changes
function setupDatabaseListener() {
    const borrowDataCollection = collection(db, 'ccc-library-borrow-data');
    
    // Listen for changes in the data
    onSnapshot(borrowDataCollection, () => {
        // Update the content whenever the data changes
        fetchBorrowData();
    });
}

// Set up the database listener
setupDatabaseListener();