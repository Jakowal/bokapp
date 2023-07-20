import {Button, Table} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import {useEffect, useState} from "react";
import Style from './index.module.scss';

interface Props {
  data: BookModel[];
  selectBook: (book: BookModel) => void;
}

const defaultColumns: (keyof BookModel)[] = [
  'authorLastName',
  'authorFirstName',
  'title',
  'edition',
  'registeredDate',
]

const TableComponent = (
  {
    data,
    selectBook,
  }: Props
) => {


  const [shownColumns, setShownColumns] = useState<(keyof BookModel)[]>(defaultColumns)

  useEffect(() => {
    setShownColumns(defaultColumns)
  }, [])

  return (
    <div className={Style.tableContainer}>
      <Table bordered striped hover size="sm" className={Style.table}>
        <thead>
        <tr>
          { shownColumns.map(value => <th key={value}>{BookModelFieldTranslationsFromEnglish[value]}</th>) }
        </tr>
        </thead>
        <tbody className={Style.tableBody}>
        { data.map(entry => (
          <tr key={entry.id}>
            <td><Button onClick={() => selectBook(entry)}>Rediger</Button></td>
            {
              shownColumns.map(field => (
                <td key={entry[field] as string}>{entry[field] as string}</td>
              ))
            }
          </tr>
        ))}
        </tbody>
        <tfoot>

        </tfoot>
      </Table>
    </div>
  )
}


export default TableComponent;