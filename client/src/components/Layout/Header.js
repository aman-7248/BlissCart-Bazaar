import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { GiShoppingBag } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./Header.css"; // 🟦 Custom CSS for underline

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GiShoppingBag /> Blisscart Bazaar
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <SearchInput />

              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link nav-underline"
                  style={{ textDecoration: "none" ,marginLeft:"90px"}}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle nav-underline"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ textDecoration: "none" }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link nav-underline"
                      style={{ textDecoration: "none" }}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link nav-underline"
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ cursor: "pointer" }}
                    >
                      {auth?.user?.name}
                    </span>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link nav-underline"
                  style={{ textDecoration: "none" }}
                >
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[5, -5]} // 🔴 Move badge to top-right
                    style={{
                      backgroundColor: "#dc3545",
                      fontWeight: "bold",
                    }}
                  >
                    <FaShoppingCart style={{ fontSize: "18px" }} />
                  </Badge>{" "}
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
