import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";
import {auth, googleProvider} from "../config/firebase.js";
import LoaderSpinner from "../components/LoaderSpinner/index.jsx";
import axios from "axios";

const UserContext = createContext({});

// eslint-disable-next-line react-hooks/rules-of-hooks
export const uesAuthContext = () => useContext(UserContext);

const AuthContext = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logInUserWithGoogle = async () =>
    await signInWithPopup(auth, googleProvider);

  const logOutUser = async () => await signOut(auth);

  // always check user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      axios
        .get(`/users/${currentUser?.email}`)
        .then(function ({data}) {
          const userData = {...currentUser, ...data};
          setUser(userData);
          setLoading(false);
        })
        .catch(function () {
          logOutUser();
          setLoading(false);
        });
    });
    return () => unsubscribe();
  }, []);

  // start THEME handler
  const [theme, setTheme] = useState("light");

  // if local storage is empty save theme as light
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    // select html elem
    const html = document.querySelector("html");
    //add or remove class dark in html elem according to theme in localstorage.
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  // handle switch theme
  const handleThemeSwitch = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  const isDark = localStorage.getItem("theme") === "dark";
  // end THEME handler

  const userInfo = {
    handleThemeSwitch,
    isDark,
    loading,
    user,
    createUser,
    logInUser,
    logInUserWithGoogle,
    logOutUser,
  };

  return (
    <UserContext.Provider value={userInfo}>
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default AuthContext;
