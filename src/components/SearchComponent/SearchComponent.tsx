interface Props {
  searchTerm: string;
  setSearchTerm: (newTerm: string) => void;
}

const SearchComponent = (
  {
    searchTerm,
    setSearchTerm,
  }: Props
) => {



  return (
    <input value={searchTerm} onChange={change => setSearchTerm(change.currentTarget.value)}/>
  )
}


export default SearchComponent;