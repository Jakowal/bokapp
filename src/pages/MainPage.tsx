import {searchBookByTitle, transformServerResponse} from "../utils/cosmos-db.utils";
import {useEffect, useState} from "react";
import TableComponent from "../components/TableComponent";
import SearchComponent from "../components/SearchComponent";
import {Button} from "react-bootstrap";
import {BookModel} from "../models/BookModel";


const MainPage = () => {

  const [data, setData] = useState<BookModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [runSearch, setRunSearch] = useState(true);


  useEffect(() => {
    if (runSearch) {
      searchBookByTitle(searchTerm)
        .then(result => result.json())
        .then(result => setData(transformServerResponse(result)))
      setRunSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSearch])

  return (
    <>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Button onClick={() => setRunSearch(true)}>Søk</Button>
      <TableComponent data={data}/>
    </>
  )
}

export default MainPage;