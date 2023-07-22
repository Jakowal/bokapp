import {Table} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import Style from './index.module.scss';
import Edit from "../../icons/edit.svg";
import format from "date-fns/format";

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

  const formatEntry = (entry: any): string => {
    if (entry instanceof Date) {
      return format(entry, 'dd.MM.yyyy');
    }
    else return entry as string;
  }

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
                  <td key={entry[field] as string}>{formatEntry(entry[field])}</td>
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