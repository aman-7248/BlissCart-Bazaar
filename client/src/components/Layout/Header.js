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
import "./Header.css"; // Contains underline fix

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
      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{
          background: "linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%)",
        }}
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 text-dark fw-bold fs-4"
          >
            <GiShoppingBag size={24} />
            Blisscart Bazaar
          </Link>

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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item me-2">
                <SearchInput />
              </li>

              <li className="nav-item me-2">
                <NavLink
                  to="/"
                  className="nav-link nav-underline fw-medium px-2"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown me-2">
                <Link
                  className="nav-link dropdown-toggle nav-underline fw-medium px-2"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu dropdown-menu-end shadow">
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
                  <li className="nav-item me-2">
                    <NavLink
                      to="/register"
                      className="nav-link nav-underline fw-medium px-2"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item me-2">
                    <NavLink
                      to="/login"
                      className="nav-link nav-underline fw-medium px-2"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown me-2">
                  <span
                    className="nav-link dropdown-toggle fw-medium px-2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    {auth?.user?.name}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
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
              )}

              <li className="nav-item me-2">
                <NavLink
                  to="/cart"
                  className="nav-link nav-underline fw-medium position-relative px-2"
                >
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[5, -5]}
                    style={{
                      backgroundColor: "#dc3545",
                      fontWeight: "bold",
                      fontSize: "12px",
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
