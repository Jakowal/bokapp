import {formatBooks, searchBook} from "../../utils/cosmos-db.util";
import {useContext, useEffect, useState} from "react";
import TableComponent from "../../components/TableComponent";
import { BookModel } from "../../models/BookModel";
import BookModal from "../../components/BookModal";
import Style from './index.module.scss';
import HeaderComponent from "../../components/HeaderComponent";
import {Spinner} from "react-bootstrap";
import ColumnModal from "../../components/ColumnModal";
import AuthContext from "../../AuthContext";


const MainPage = () => {

  const defaultColumns: (keyof BookModel)[] = [
    'authorLastName',
    'authorFirstName',
    'title',
    'edition',
    'registeredDate',
  ]

  const [data, setData] = useState<BookModel[]>([]);
  const [searchFields, setSearchFields] = useState<any>({});
  const [runSearch, setRunSearch] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookModel>();
  const [showBookModal, setShowBookModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shownColumns, setShownColumns] = useState<(keyof BookModel)[]>(defaultColumns);

  const user = useContext(AuthContext);

  useEffect(() => {
    if (runSearch && searchFields) {
      setLoading(true);
      searchBook('dummy', searchFields)
        .then((response: any) => response.json())
        .then((result: BookModel[]) => setData(formatBooks(result)))
        .finally(() => setLoading(false))
      setRunSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSearch])

  const selectBook = (book: BookModel) => {
    setShowBookModal(true);
    setSelectedBook(book)
  }

  const closeBookModal = () => {
    setShowBookModal(false);
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
        setShowBookModal={setShowBookModal}
        setShowColumnModal={setShowColumnModal}
        removeSearchField={removeSearchField}
      />
      <TableComponent data={data} selectBook={selectBook} shownColumns={shownColumns}/>
      <BookModal
        show={showBookModal}
        hide={closeBookModal}
        bookToEdit={selectedBook}
        runSearch={() => setRunSearch(true)}
      />
      <ColumnModal
        show={showColumnModal}
        hide={() => setShowColumnModal(false)}
        setShownColumns={setShownColumns}
        shownColumns={shownColumns}
      />
    </div>
  )
}

export default MainPage;
