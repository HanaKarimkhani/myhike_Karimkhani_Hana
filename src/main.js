// import { checkAuthState, logoutUser } from './authentication.js';

// checkAuthState();

// const logoutBtn = document.getElementById('logoutBtn');

// logoutBtn.addEventListener('click', async () => {
//     await logoutUser();
// });

// Import the file that has the authentication helper function we want to use.
// The function we want to use is called "onAuthReady" which returns the login state
import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";


// Function to read the quote of the day from Firestore
function readQuote(day) {
    const quoteDocRef = doc(db, "quotes", day);

    onSnapshot(quoteDocRef, docSnap => {
        if (docSnap.exists()) {
            document.getElementById("quote-goes-here").innerHTML = docSnap.data().quote;
        } else {
            console.log("No such document!");
        }
    }, (error) => {
        console.error("Error listening to document: ", error);
    });
}


function showName() {
    const nameElement = document.getElementById("name-goes-here");

    onAuthReady(async (user) => {
        if (!user) {
            location.href = "index.html";
            return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));

        const name = userDoc.exists()
            ? userDoc.data().name
            : user.displayName || user.email;

        if (nameElement) {
            nameElement.textContent = `${name}!`;
        }
    });
}
showName();


const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];

const today = new Date();
const dayName = days[today.getDay()];

console.log(dayName);
readQuote(dayName);