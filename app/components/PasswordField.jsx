"use client";

import { useState } from "react";

export const inputClass =
  "w-full rounded-md border-2 border-ink bg-white px-4 py-3 text-ink placeholder:text-muted";

export default function PasswordField({ id, name, label, placeholder, autoComplete, children }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        {children}
      </div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className={`${inputClass} pr-20`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-pressed={show}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-semibold underline underline-offset-2"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
