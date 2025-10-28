import React from "react";

export default function RecentSearches({ items = [], onSelect, onClear }) {
  return (
    <div>
      <h4 style={{margin:"0 0 8px 0"}}>Recent searches</h4>
      <div className="recent-list">
        {items.length === 0 && <div className="small">No recent searches</div>}
        {items.map((it, idx) => (
          <div key={idx} className="recent-item">
            <span>{it.name}, {it.country}</span>
            <div style={{display:"flex", gap:8}}>
              <button className="btn-small" onClick={() => onSelect(it)}>Open</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:10, textAlign:"center"}}>
        <button className="btn-small" onClick={onClear}>Clear</button>
      </div>
    </div>
  )
}
