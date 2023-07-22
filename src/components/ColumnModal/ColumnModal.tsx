import {Button, Modal} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import {useEffect, useState} from "react";
import Style from './index.module.scss';

interface Props {
  show: boolean;
  hide: () => void
  shownColumns: (keyof BookModel)[];
  setShownColumns: (columns: (keyof BookModel)[]) => void;
}

const ColumnModal = (
  {
    show,
    hide,
    shownColumns,
    setShownColumns,
  }: Props
) => {

  const [columns, setColumns] = useState(shownColumns);

  useEffect(() => console.log(columns), [columns])

  const onSelect = (e: any, field: keyof BookModel) => {
    const index = columns.indexOf(field)
    let newColumns = [...columns];
    if (index === -1) {
      newColumns.push(field);
    }
    else {
      newColumns.splice(index, 1)
    }
    setColumns(newColumns);
  }


  return (
    <>
      <Modal scrollable centered show={show} onHide={hide} className={Style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Velg kolonner</Modal.Title>
        </Modal.Header>
        <Modal.Body className={Style.modalBody}>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(([field, value]) => {
              if (field !== 'bookNumber' && field !== 'id') {
                return (
                  <div
                    className={Style.inputGroup}
                    key={field}
                  >
                    <input
                      id={field}
                      className={Style.inputCheckBox}
                      type="checkbox"
                      checked={columns.indexOf(field as unknown as keyof BookModel) !== -1}
                      onChange={e => onSelect(e, field as unknown as keyof BookModel)}
                    />
                    <label htmlFor={field} className={Style.inputButton}>{ value }</label>
                  </div>
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
              setShownColumns(columns)
            }}
          >Lagre</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ColumnModal;