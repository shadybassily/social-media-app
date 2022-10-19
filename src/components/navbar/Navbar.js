import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//styling
import "./navbar.styles.css";
import anonymousUser from "../../assets/images/anonymous-user.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex flex-column">
            <img
              src={user?.photoURL || anonymousUser}
              alt="profile"
              className="profile-photo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header ">
              <h5 id="offcanvasDarkNavbarLabel">
                {user?.displayName}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {user ? (
                    <>
                      <Link className="nav-link" onClick={handleLogout}>
                        Logout
                      </Link>
                      <Link className="nav-link" to='/create-post'>
                        Create Post
                      </Link>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </li>
              
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
