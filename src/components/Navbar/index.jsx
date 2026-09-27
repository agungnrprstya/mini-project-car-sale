import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsList, BsX } from "react-icons/bs";
import { APIAuth } from "../../apis/APIAuth";
import authentication from "../../utils/authentication";
import useIsAdmin from "../../hooks/useIsAdmin";

const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-signal px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-signal-strong";
const outlineButton =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-paper-line bg-white px-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-paper";

const desktopItemClass = ({ isActive }) =>
  `relative inline-flex min-h-11 items-center px-3 text-sm font-medium ${
    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
  }`;

const mobileItemClass = ({ isActive }) =>
  `flex min-h-11 items-center text-sm font-medium ${isActive ? "text-ink" : "text-ink-soft hover:text-ink"}`;

function DesktopNavItem({ to, label }) {
  return (
    <NavLink to={to} className={desktopItemClass}>
      {({ isActive }) => (
        <>
          {label}
          {isActive && <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-0.5 bg-signal" />}
        </>
      )}
    </NavLink>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const isAdmin = useIsAdmin();

  const authorized = authentication.isAuthorized();

  const logout = async () => {
    setLoading(true);
    try {
      await APIAuth.signOut();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    } catch (error) {
      console.error("Gagal logout: ", error);
    } finally {
      setLoading(false);
    }
  };

  const closeMobile = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-paper-line bg-paper">
      <div className="shell">
        <nav aria-label="Main" className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex min-h-11 items-center gap-2">
            <img src="/racing-car.png" alt="" aria-hidden="true" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-ink">Bandar Mobil</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <DesktopNavItem to="/" label="Home" />
            <DesktopNavItem to="/product" label="All cars" />
            {authorized && <DesktopNavItem to="/my-order" label="My Order" />}
            {isAdmin && <DesktopNavItem to="/dashboard" label="Dashboard" />}
          </div>

          <div className="flex items-center gap-2">
            {authorized ? (
              <button
                type="button"
                onClick={logout}
                disabled={loading}
                className={`${outlineButton} hidden disabled:opacity-60 lg:inline-flex`}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link to="/login" className={`${primaryButton} hidden lg:inline-flex`}>
                Sign In
              </Link>
            )}
            <button
              type="button"
              ref={toggleRef}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper-line bg-white text-ink transition-colors duration-200 hover:border-ink lg:hidden"
            >
              {open ? <BsX aria-hidden="true" className="h-5 w-5" /> : <BsList aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-paper-line bg-white shadow-sm lg:hidden">
        <nav aria-label="Mobile" className="shell flex flex-col py-2">
          <NavLink to="/" className={mobileItemClass} onClick={closeMobile}>
            Home
          </NavLink>
          <NavLink to="/product" className={mobileItemClass} onClick={closeMobile}>
            All cars
          </NavLink>
          {authorized && (
            <NavLink to="/my-order" className={mobileItemClass} onClick={closeMobile}>
              My Order
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/dashboard" className={mobileItemClass} onClick={closeMobile}>
              Dashboard
            </NavLink>
          )}
          {authorized ? (
            <button type="button" onClick={logout} disabled={loading} className={`${outlineButton} mt-2 w-full disabled:opacity-60`}>
              {loading ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link to="/login" onClick={closeMobile} className={`${primaryButton} mt-2 w-full`}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
