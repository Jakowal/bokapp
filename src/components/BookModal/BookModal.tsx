import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import {useEffect, useState} from "react";
import {addBook, editBook} from "../../utils/cosmos-db.utils";

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
      <Modal centered show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{bookToEdit ? 'Endre informasjon for bok' : 'Registrer ny bok'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(([field, value]) => {
              return (
              <>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text>{value}</InputGroup.Text>
                  <Form.Control
                    defaultValue={bookToEdit ? bookToEdit[field as keyof BookModel] as string || '' : ''}
                    onChange={change => setBook({
                      ...book,
                      [field]: change.currentTarget.value,
                    })}
                  />
                </InputGroup>
              </>
              )
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