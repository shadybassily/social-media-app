//components
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/posts/CreatePost";
//styling
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
//auth
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//additional imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import PageNotFound from "./pages/page-not-found/PageNotFound";

export const appContext = createContext();

function App() {
  const [user] =  useAuthState(auth);
  return (
    <BrowserRouter>
      <Navbar />
      <appContext.Provider value={{user}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost user={user} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </appContext.Provider>
    </BrowserRouter>
  );
}

export default App;
