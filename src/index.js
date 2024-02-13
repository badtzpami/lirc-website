// Import necessary Firebase modules
import { getFirestore, collection, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
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
 
function getBorrowTimeDifference(modelBorrowDeadlineDateTime) {
    const borrowDeadlineDateTime = modelBorrowDeadlineDateTime.split("-");
 
    // Separate the date and time components
    const datePart = borrowDeadlineDateTime[0];
    const timePart = borrowDeadlineDateTime[1];
 
    // Extract day, month, and year components
    const [day, month, year] = datePart.split("/");
 
    // Combine the components in the correct order
    const borrowDeadlineDateTimeFinal = `${month}/${day}/${year} ${timePart.replace(/\s*:\s*/g, ":")}`;
 
    // Get the current date and time in the same format
    const options = { timeZone: 'Asia/Manila' };
    const currentDateTime = new Date().toLocaleString('en-US', options);
    console.log("Current time: ", currentDateTime)
 
    // Calculate the time difference in minutes
    const timeDifference = calculateDateTimeDifferenceInMinutes(currentDateTime, borrowDeadlineDateTimeFinal);
 
    return timeDifference.toString();
}
 
// Function to calculate time difference in minutes
function calculateDateTimeDifferenceInMinutes(dateTime1, dateTime2) {
    const parsedDateTime1 = new Date(dateTime1);
    const parsedDateTime2 = new Date(dateTime2);
 
    const timeDifference = parsedDateTime2.getTime() - parsedDateTime1.getTime();
    console.log("Current time-final: ", parsedDateTime1.getTime())
 
    return timeDifference / (60 * 1000);
}
 
function fetchBorrowData() {
    const pastDueCollection = collection(db, 'ccc-library-app-borrow-data');
 
    getDocs(pastDueCollection)
        .then((querySnapshot) => {
            const pastDueData = [];
 
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const deadline = data.modelBorrowDeadline;
                const timeDifference = getBorrowTimeDifference(deadline);
 
                console.log('Time difference: ', getBorrowTimeDifference(deadline))
                console.log('Book name: ', data.modelBookTitle)
                if (Number(timeDifference) <= 0) {
                    pastDueData.push(data);
                }
            });
 
            document.getElementById('overdueCount').textContent = pastDueData.length.toString();
 
            console.log('Past due count:', pastDueData.length);
        })
        .catch((error) => {
            console.error('Error fetching past due data:', error);
        });
 
 
 
 
 
    const returnedData = collection(db, 'ccc-library-app-return-info');
 
    let totalDocuments = 0;  // Initialize a counter
 
    onSnapshot(returnedData, (querySnapshot) => {
        // Reset the counter for each snapshot to calculate the total in the current snapshot
        totalDocuments = 0;
 
        querySnapshot.forEach((doc) => {
            const returnedData = doc.data();
 
            // Your processing logic for each document if needed
 
            totalDocuments++;  // Increment the counter for each document
        });
 
        console.log('Total return counter:', totalDocuments);
        document.getElementById('returnedCount').textContent = totalDocuments.toString();
    });
 
    // Reference to the 'ccc-library-borrow-data' collection
    const borrowDataCollection = collection(db, 'ccc-library-app-borrow-data');
 
    // Attach an event listener to listen for changes in the data
    onSnapshot(borrowDataCollection, (querySnapshot) => {
        // Clear existing content
        document.getElementById('txtPlaceholder').innerHTML = '';
 
        // Iterate through the query snapshot to get each document's data
        querySnapshot.forEach((doc) => {
            const data = doc.data();
 
            // Display the data on the website as a table row
            document.getElementById('txtPlaceholder').innerHTML += `
                <tr>
                    <td>${data.modelBookCode}</td>
                    <td>${data.modelBookTitle}</td>
                    <td>${data.modelBookAuthor}</td>
                    <td>${data.modelUserName}</td>
                    <td>${data.modelUserProgram}</td>
                    <td>${data.modelUserSection}</td>
                    <td>${data.modelBorrowDate}</td>
                    <td>${data.modelBorrowDeadline}</td>
                    <td>
                        <button class="btn btn-ghost btn-sm">
                            <i class="fa-solid fa-trash text-red-500"></i>
                        </button>
                        <button class="btn btn-ghost btn-sm">
                            <i class="fa-solid fa-pen-to-square text-green-500"></i>
                        </button>
                    </td>
                </tr>
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
 
// BORROW COUNT
setupDatabaseListener();
 
// Function to fetch borrow data and update UI
function fetchAndRenderBorrowData() {
    // Reference to the 'ccc-library-app-borrow-data' collection
    const borrowDataCollection = collection(db, 'ccc-library-app-borrow-data');
 
    // Attach a listener to listen for changes in the data
    onSnapshot(borrowDataCollection, (querySnapshot) => {
        // Count the number of documents in the collection
        const borrowCount = querySnapshot.size;
 
        // Update the UI with the new borrow count
        document.getElementById('borrowCount').textContent = borrowCount.toString();
    });
}
 
// Initial fetch and render when the page loads
fetchAndRenderBorrowData();
 
// Loading function
function loading() {
    // Display loading indicator
    document.getElementById('loading').classList.remove('hidden');
 
    // Simulate fetching data (replace this with your actual fetch request)
    setTimeout(function() {
        // Hide loading indicator after data is fetched (replace this with your actual data fetching logic)
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
    }, 2000); // Simulating a 2-second delay for fetching data
}
 
window.onload = loading;
