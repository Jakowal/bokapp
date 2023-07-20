import SearchComponent from "../SearchComponent";
import {Button, Dropdown} from "react-bootstrap";
import {BookModel, BookModelFieldTranslationsFromEnglish} from "../../models/BookModel";
import Style from './index.module.scss';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setRunSearch: (run: boolean) => void;
  searchField: string,
  setSearchField: (field: string) => void;
  setShowModal: (run: boolean) => void;
}

const HeaderComponent = (
  {
    searchTerm,
    setSearchTerm,
    setRunSearch,
    searchField,
    setSearchField,
    setShowModal,
  }: Props
) => {

  return (
    <section className={Style.titleSection}>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Button onClick={() => setRunSearch(true)}>Søk</Button>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          { BookModelFieldTranslationsFromEnglish[searchField as unknown as keyof BookModel] || searchField }
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            Object.entries(BookModelFieldTranslationsFromEnglish).map(entry => (
              <Dropdown.Item key={entry[1]} onClick={() => setSearchField(entry[0])}>{entry[1]}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>

      <Button onClick={() => setShowModal(true)}>Ny bok</Button>
    </section>
  )
}

export default HeaderComponent;