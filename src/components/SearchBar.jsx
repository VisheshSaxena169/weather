import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ("");
  }

  return (
    <form onSubmit={submit} className="searchbar">
      <input
        className="search-input"
        placeholder="Enter city (e.g., Bengaluru, London)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="search-btn" type="submit">Search</button>
    </form>
  );
}
