function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search"
    />
  );
}

export default SearchBar;