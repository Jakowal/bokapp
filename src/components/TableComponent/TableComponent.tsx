import {Button, Table} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import {useEffect, useState} from "react";

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
    <Table bordered striped hover size="sm">
      <thead>
      <tr>
        { shownColumns.map(value => <th key={value}>{BookModelFieldTranslationsFromEnglish[value]}</th>) }
      </tr>
      </thead>
      <tbody>
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
  )
}


export default TableComponent;