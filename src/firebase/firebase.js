import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: "",
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database()

export { firebase, database as default }

// database.ref().set({
// 	name: 'abder fas',
// 	age: 27,
// 	single: false,
// 	location: {
// 		city: 'khouribga',
// 		country: 'namibia'
// 	}
// })

// database.ref('attributes').set({
// 	height: 175,
// 	weight: 83.2,
// })