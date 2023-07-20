import {searchBookByTitle} from "../../utils/cosmos-db.utils";
import {useEffect, useState} from "react";
import TableComponent from "../../components/TableComponent";
import { BookModel } from "../../models/BookModel";
import BookModal from "../../components/BookModal";
import Style from './index.module.scss';
import HeaderComponent from "../../components/HeaderComponent";


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
        .then(result => setData(result))
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
    <div className={Style.mainPage}>
      <HeaderComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setRunSearch={setRunSearch}
        searchField={searchField}
        setSearchField={setSearchField}
        setShowModal={setShowModal}
      />
      <TableComponent data={data} selectBook={selectBook}/>
      <BookModal show={showModal} hide={closeModal} bookToEdit={selectedBook}/>
    </div>
  )
}

export default MainPage;