import {searchBookByTitle, transformServerResponse} from "../utils/cosmos-db.utils";
import {useEffect, useState} from "react";
import TableComponent from "../components/TableComponent/TableComponent";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import { Button, Dropdown } from "react-bootstrap";
import { BookModel, BookModelFieldTranslationsFromEnglish } from "../models/BookModel";
import BookModal from "../components/BookModal/BookModal";


const MainPage = () => {

  const [data, setData] = useState<BookModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('Velg felt å søke på');
  const [runSearch, setRunSearch] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookModel>();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (runSearch) {
      searchBookByTitle(searchTerm, searchField)
        .then(response => response.json())
        .then(result => setData(transformServerResponse(result)))
      setRunSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSearch])

  const selectBook = (book: BookModel) => {
    setShowModal(true);
    setSelectedBook(book)
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(undefined);
  }

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
      <TableComponent data={data} selectBook={selectBook}/>
      <Button onClick={() => setShowModal(true)}>Ny bok</Button>
      <BookModal show={showModal} hide={closeModal} bookToEdit={selectedBook}/>
    </>
  )
}

export default MainPage;