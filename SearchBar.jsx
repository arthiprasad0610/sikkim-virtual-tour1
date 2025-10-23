export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search by title, monastery, category..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
