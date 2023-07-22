import {Table} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import Style from './index.module.scss';
import Edit from "../../icons/edit.svg";

interface Props {
  data: BookModel[];
  selectBook: (book: BookModel) => void;
  shownColumns: (keyof BookModel)[]
}

const TableComponent = (
  {
    data,
    selectBook,
    shownColumns
  }: Props
) => {

  return (
    <div className={Style.tableContainer}>
      <section className={Style.tableSection}>
        <Table bordered striped hover size="sm" className={Style.table}>
          <thead className={Style.tableHeader}>
            <tr>
              <th>Rediger</th>
              { shownColumns.map(value => <th key={value}>{BookModelFieldTranslationsFromEnglish[value]}</th>) }
            </tr>
          </thead>
          <tbody className={Style.tableBody}>
          { data.map(entry => (
            <tr key={entry.id}>
              <td className={Style.buttonColumn}>
                <button className={Style.editButton} onClick={() => selectBook(entry)}>
                  <img alt="Chevron" src={Edit} className={Style.icon}/>
                </button>
              </td>
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
      </section>
    </div>
  )
}


export default TableComponent;