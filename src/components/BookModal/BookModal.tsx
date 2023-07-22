import {Button, Modal} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import {useEffect, useState} from "react";
import {addBook, editBook} from "../../utils/cosmos-db.utils";
import Style from './index.module.scss';
import SearchComponent from "../SearchComponent";

interface Props {
  show: boolean;
  hide: () => void
  bookToEdit?: BookModel
}

const BookModal = (
  {
    show,
    hide,
    bookToEdit,
  }: Props
) => {

  const [book, setBook] = useState(bookToEdit);

  useEffect(() => {
    setBook(bookToEdit);
  }, [bookToEdit])


  return (
    <>
      <Modal scrollable centered size="lg" show={show} onHide={hide} className={Style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>{bookToEdit ? 'Endre informasjon for bok' : 'Registrer ny bok'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={Style.modalBody}>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(([field, value]) => {
              if (field !== 'bookNumber' && field !== 'id') {
                let defaultValue = bookToEdit ? bookToEdit[field as keyof BookModel] as string || '' : ''
                if (!defaultValue && field === 'registeredDate') {
                  defaultValue = new Date().toJSON();
                }
                return (
                  <SearchComponent
                    setSearchTerm={change => setBook({
                      ...book,
                      [field]: change,
                    })}
                    searchField={value}
                    searchTerm={defaultValue}/>
                )
              }
              return null;
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={hide}>Avbryt</Button>
          <Button
            variant="primary"
            onClick={() => {
              hide();
              bookToEdit ? editBook(book!) : addBook(book!);
            }}
          >Lagre</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BookModal;