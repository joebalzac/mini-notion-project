interface Props {
  search: string;
  setSearch: (search: string) => void;
}

export const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div>
      {' '}
      <input
        type="text"
        placeholder="Search Notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
