// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { runTransaction, getDatabase, ref, get, child, set } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAMLRKoE5W6Ke1AHMGoYM4iJY2DROLrHXs',
    authDomain: 'thulinhsinhvien-ebf15.firebaseapp.com',
    databaseURL: 'https://thulinhsinhvien-ebf15-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'thulinhsinhvien-ebf15',
    storageBucket: 'thulinhsinhvien-ebf15.appspot.com',
    messagingSenderId: '816568065430',
    appId: '1:816568065430:web:79e5c693cceb5bfad491b7',
    measurementId: 'G-7SYMXDZD5Y',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export async function readData(dataPath) {
    const dbRef = ref(database);

    try {
        const snapshot = await get(child(dbRef, dataPath));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export async function writeData(dataPath, data) {
    const dbRef = ref(database, dataPath);

    try {
        await set(dbRef, data);
        console.log('Data written successfully!');
    } catch (error) {
        console.error('Error writing data: ', error);
    }
}

export async function updateDataWithTransaction(path, updateFn) {
    const dbRef = ref(database, path); // Sử dụng ref của Firebase SDK mới

    try {
        await runTransaction(dbRef, (currentValue) => {
            return updateFn(currentValue);
        });
        console.log('Transaction successful!');
    } catch (error) {
        console.error('Transaction failed: ', error);
    }
}
