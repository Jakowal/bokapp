import {Button, Modal} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import {useContext, useEffect, useState} from "react";
import {addBook, editBook} from "../../utils/cosmos-db.util";
import Style from './index.module.scss';
import TextInputComponent from "../TextInputComponent";
import AuthContext from "../../AuthContext";
import format from "date-fns/format";

interface Props {
  show: boolean;
  hide: () => void
  bookToEdit?: BookModel
  runSearch: () => void;
}

const BookModal = (
  {
    show,
    hide,
    bookToEdit,
    runSearch,
  }: Props
) => {

  const [book, setBook] = useState(bookToEdit);
  const user = useContext(AuthContext);

  useEffect(() => {
    setBook(bookToEdit);
  }, [bookToEdit]);


  return (
    <>
      <Modal scrollable centered size="lg" show={show} onHide={hide} className={Style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>{bookToEdit ? 'Endre informasjon for bok' : 'Registrer ny bok'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={Style.modalBody}>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(([field, value]) => {
              if (field !== 'bookNumber' && field !== 'id' && field !== 'lastChanged') {
                let defaultValue = bookToEdit ? bookToEdit[field as keyof BookModel] as string || '' : ''
                if (!defaultValue && field.includes('Date')) {
                  defaultValue = format(new Date(), 'yyyy-MM-dd');
                }
                else if (field.includes('Date')) {
                  defaultValue = format(bookToEdit![field as keyof BookModel] as Date, 'yyyy-MM-dd')
                }
                return (
                  <TextInputComponent
                    key={field}
                    setTextValue={change => setBook({
                      ...book,
                      [field]: field.includes('Date') ? new Date(change) : change,
                    })}
                    bookModelField={field}
                    defaultValue={defaultValue}/>
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
              book!.lastChanged = new Date();
              if (bookToEdit) {
                editBook(book!).finally(runSearch)
              }
              else {
                book!.userId = user?.accessToken;
                addBook(book!).finally(runSearch)
              }
            }}
          >Lagre</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BookModal;