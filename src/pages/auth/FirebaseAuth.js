// import firebaseConfig from "../../component/auth/FirebaseConfig";
// import * as firebaseui from "firebaseui";
// import firebase from "firebase/compat/app";
// import { useEffect } from "react";

// export const FirebaseAuth = () => {

//     useEffect(() => {
//         const fbase = firebase.initializeApp(firebaseConfig);
//         const uiConfig = {
//             signInSuccessUrl: "https://www.naver.com",
//             signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
//             tosUrl: "https://www.naver.com"
//         };
//         let ui = new firebaseui.auth.AuthUI(firebase.auth());
//         ui.start("#firebaseui-auth-container", uiConfig);
//     }, []);
    
// 	return(
//     	<div>
//         	<div id="firebaseui-auth-container"></div>
//         </div>
// 	)
// }
// export default FirebaseAuth;