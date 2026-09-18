import React from "react";
import { Link } from "react-router-dom";

const footerLink =
  "inline-flex min-h-11 items-center text-sm font-medium text-ink-soft underline decoration-ink-mute underline-offset-4 transition-colors duration-200 hover:text-ink";

function Footer() {
  return (
    <footer className="border-t border-paper-line bg-white">
      <div className="shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-ink">Bandar Mobil</span>
          <p className="text-sm text-ink-mute">Cars for sale: photo, category, and price on every listing.</p>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-6">
          <Link to="/" className={footerLink}>
            Home
          </Link>
          <Link to="/product" className={footerLink}>
            All cars
          </Link>
        </nav>
      </div>
      <div className="shell pb-8">
        <p className="border-t border-paper-line pt-6 text-sm text-ink-mute">
          © {new Date().getFullYear()} Bandar Mobil. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
