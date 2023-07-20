import {addBook, searchBookByTitle, transformServerResponse} from "../utils/cosmos-db.utils";
import {useEffect, useState} from "react";
import TableComponent from "../components/TableComponent/TableComponent";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import { Button, Dropdown } from "react-bootstrap";
import { BookModel, BookModelFieldTranslationsFromEnglish } from "../models/BookModel";


const MainPage = () => {

  const [data, setData] = useState<BookModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('Velg felt å søke på');
  const [runSearch, setRunSearch] = useState(false);


  useEffect(() => {
    if (runSearch) {
      searchBookByTitle(searchTerm, searchField)
        .then(response => {
          console.trace(response)
          return response.json()
        })
        .then(result => {
          console.trace(result)
          setData(transformServerResponse(result))
        })
      setRunSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSearch])

  return (
    <>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Button onClick={() => setRunSearch(true)}>Søk</Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          { BookModelFieldTranslationsFromEnglish[searchField as unknown as keyof BookModel] || searchField }
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(entry => (
              <Dropdown.Item key={entry[1]} onClick={() => setSearchField(entry[0])}>{entry[1]}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      <TableComponent data={data}/>
      <Button onClick={() => addBook(false)}>Ny bok</Button>
    </>
  )
}

export default MainPage;