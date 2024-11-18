import React, { ChangeEvent, useRef, useState } from "react";

import { useOutsideClick } from "@utils/hooks";

interface Props {
  placeholder: string;
  badge?: string | number;
  options: {
    name: string;
    label: string;
    isActive?: boolean;
    onChange: (val: ChangeEvent<HTMLInputElement>) => void;
  }[];
}

const Dropdown: React.FC<Props> = ({ options, placeholder, badge }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useOutsideClick(menuRef, () => setIsOpen(false));

  return (
    <div className="relative inline-block w-full" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="w-full rounded-md border border-light bg-transparent text-sm font-medium text-white outline-none flex items-center justify-between p-2"
      >
        <div className="flex items-center gap-2">
          <span>{placeholder}</span>
          {!!badge && <span className="text-xs text-primary">({badge})</span>}
        </div>
        <svg
          className={`-mr-1 ml-2 h-5 w-5 text-white transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`absolute w-full right-0 mt-1 bg-dark shadow-lg rounded-md z-10 
            transition-all duration-300 ease-out transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"} 
            ${isOpen ? "" : "pointer-events-none"}
          `}
        style={{
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col justify-between py-2">
          {options.map((item, index) => (
            <div className="flex gap-2 items-center p-4" key={index}>
              <input
                id={item.name}
                name={item.name}
                type="checkbox"
                checked={item.isActive}
                onChange={item.onChange}
                className="cursor-pointer"
              />
              <label htmlFor={item.name} className="text-sm">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
