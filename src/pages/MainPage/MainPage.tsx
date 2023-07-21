import {searchBookByTitle} from "../../utils/cosmos-db.utils";
import {useEffect, useState} from "react";
import TableComponent from "../../components/TableComponent";
import { BookModel } from "../../models/BookModel";
import BookModal from "../../components/BookModal";
import Style from './index.module.scss';
import HeaderComponent from "../../components/HeaderComponent";
import {Spinner} from "react-bootstrap";


const MainPage = () => {

  const [data, setData] = useState<BookModel[]>([]);
  const [searchFields, setSearchFields] = useState<any>({});
  const [runSearch, setRunSearch] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookModel>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (runSearch && searchFields) {
      setLoading(true);
      searchBookByTitle(searchFields)
        .then(response => response.json())
        .then(result => setData(result))
        .finally(() => setLoading(false))
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

  const addSearchField = (field: string) => {
    const newFields = {...searchFields};
    newFields[field] = '';
    setSearchFields(newFields);
  }

  const removeSearchField = (field: keyof BookModel) => {
    const newFields: any = {};
    Object.entries(searchFields).forEach(([f, value]) => {
      if (f !== field) {
        newFields[f] = value;
      }
    })
    setSearchFields(newFields);
  }

  const changeSearchField = (field: keyof BookModel, value: string) => {
    setSearchFields((fields: any) => {
      fields[field] = value;
      return fields;
    })
  }

  return (
    <div className={Style.mainPage}>
      { loading ? (
        <div className={Style.loadingContainer}>
          <Spinner animation="border" role="status" className={Style.loading}>
            <span className="visually-hidden">Laster...</span>
          </Spinner>
        </div>
      ) : null}
      <HeaderComponent
        changeSearchField={changeSearchField}
        runSearch={() => setRunSearch(true)}
        searchFields={searchFields}
        addSearchField={addSearchField}
        setShowModal={setShowModal}
        removeSearchField={removeSearchField}
      />
      <TableComponent data={data} selectBook={selectBook}/>
      <BookModal show={showModal} hide={closeModal} bookToEdit={selectedBook}/>
    </div>
  )
}

export default MainPage;