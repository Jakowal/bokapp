import SearchComponent from "../SearchComponent";
import {Button, Dropdown} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import Style from './index.module.scss';
import {useState} from "react";
import Chevron from '../../icons/chevron.svg';

interface Props {
  runSearch: () => void;
  searchFields: any,
  addSearchField: (field: keyof BookModel) => void;
  changeSearchField: (field: keyof BookModel, value: string) => void
  setShowBookModal: (run: boolean) => void;
  setShowColumnModal: (run: boolean) => void;
  removeSearchField: (field: keyof BookModel) => void;
}

const HeaderComponent = (
  {
    runSearch,
    searchFields,
    addSearchField,
    changeSearchField,
    setShowBookModal,
    setShowColumnModal,
    removeSearchField,
  }: Props
) => {

  const [expanded, setExplanded] = useState(false);

  return (
    <div className={`${Style.headerContainer} ${expanded ? Style.expanded : Style.notExpanded}`}>

      <Button className={Style.newBookButton} onClick={() => setShowBookModal(true)}>Ny bok</Button>
      <Button className={Style.columnsButtonButton} onClick={() => setShowColumnModal(true)}>Kolonner</Button>
      <Button className={Style.searchButton} onClick={runSearch} disabled={!Object.entries(searchFields).length}>Søk</Button>

      <Dropdown className={`${Style.dropdownButton} ${expanded || !Object.entries(searchFields).length ? Style.visible : Style.invisible}`}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Legg til felt å søke på
        </Dropdown.Toggle>
        <Dropdown.Menu className={Style.dropdownMenu}>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(([field, value]) => {
              if (searchFields[field as unknown as keyof BookModel] === undefined && field !== 'bookNumber' && field !== 'id') {
                return <Dropdown.Item key={value} onClick={() => addSearchField(field as unknown as keyof BookModel)}>{value}</Dropdown.Item>
              }
              return null;
            })
          }
        </Dropdown.Menu>
      </Dropdown>

      <section className={`${Style.searchSection} ${expanded || !Object.entries(searchFields).length ? Style.showAll : Style.showFirst}`}>
        {
          Object.entries(searchFields).map(([field, value]) => (
            <SearchComponent
              key={field}
              searchField={field}
              searchTerm={value as string}
              remove={() => removeSearchField(field as unknown as keyof BookModel)}
              setSearchTerm={value => changeSearchField((field as unknown as keyof BookModel), value)}
            />))
        }
      </section>
      <button className={Style.expandContainer} onClick={() => setExplanded(!expanded)}>
        <img alt="Chevron" src={Chevron} className={`${Style.icon} ${expanded ? Style.down : Style.up}`}/>
      </button>
    </div>
  )
}

export default HeaderComponent;