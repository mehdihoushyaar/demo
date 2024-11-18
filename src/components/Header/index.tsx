import React from "react";
import { Link } from "@tanstack/react-router";
import { headerItems } from "./items";

const Header: React.FC = () => {
  return (
    <header className="p-4">
      <nav className="flex justify-between">
        <ul className="flex gap-6">
          {headerItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.href}
                className="text-white"
                activeProps={{
                  className: "!text-primary",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
