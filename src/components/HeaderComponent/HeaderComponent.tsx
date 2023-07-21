import SearchComponent from "../SearchComponent";
import {Button, Dropdown} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import Style from './index.module.scss';
import {useState} from "react";
import Chevron from '../../icons/chevron.svg';

interface Props {
  runSearch: () => void;
  searchFields: string[],
  addSearchField: (field: keyof BookModel) => void;
  changeSearchField: (field: keyof BookModel, value: string) => void
  setShowModal: (run: boolean) => void;
  removeSearchField: (field: keyof BookModel) => void;
}

const HeaderComponent = (
  {
    runSearch,
    searchFields,
    addSearchField,
    changeSearchField,
    setShowModal,
    removeSearchField,
  }: Props
) => {

  const [expanded, setExplanded] = useState(false);

  return (
    <div className={`${Style.headerContainer} ${expanded ? Style.expanded : Style.notExpanded}`}>

      <Dropdown className={`${Style.dropdownButton} ${expanded || !Object.entries(searchFields).length ? Style.visible : Style.invisible}`}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Legg til felt å søke på
        </Dropdown.Toggle>
        <Dropdown.Menu className={Style.dropdownMenu}>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(([field, value]) => (
              <Dropdown.Item key={value} onClick={() => addSearchField(field as unknown as keyof BookModel)}>{value}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>

      <section className={Style.searchSection}>
        {
          Object.entries(searchFields).map(([field, value]) => (
            <SearchComponent
              key={field}
              searchField={field}
              searchTerm={value}
              remove={() => removeSearchField(field as unknown as keyof BookModel)}
              setSearchTerm={value => changeSearchField((field as unknown as keyof BookModel), value)}
            />))
        }
      </section>


      <Button className={Style.searchButton} onClick={runSearch}>Søk</Button>
      <Button className={Style.newBookButton} onClick={() => setShowModal(true)}>Ny bok</Button>
      <button className={Style.expandContainer} onClick={() => setExplanded(!expanded)}>
        <img alt="Chevron" src={Chevron} className={`${Style.icon} ${expanded ? Style.down : Style.up}`}/>
      </button>
    </div>
  )
}

export default HeaderComponent;