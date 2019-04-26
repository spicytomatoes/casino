import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const startLogin = () => {
  const myFunction = () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
  return myFunction();
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
