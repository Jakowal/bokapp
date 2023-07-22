import { Form, InputGroup } from "react-bootstrap";
import Style from './index.module.scss';
import { BookModel, BookModelFieldTranslationsFromEnglish } from "../../models/BookModel";
import Exit from "../../icons/exit.svg";

interface Props {
  setSearchTerm: (newTerm: string) => void;
  searchField: string;
  searchTerm: string;
  remove?: () => void;
}

const SearchComponent = (
  {
    setSearchTerm,
    searchField,
    searchTerm,
    remove,
  }: Props
) => {

  return (
    <>
      <InputGroup className={Style.inputField}>
        <InputGroup.Text className={Style.inputText}>{ BookModelFieldTranslationsFromEnglish[searchField as unknown as keyof BookModel] || searchField }</InputGroup.Text>
        <Form.Control
          defaultValue={searchTerm}
          onChange={change => setSearchTerm(change.target.value)}
          style={{
            borderRight: remove ? 'unset' : ''
          }}
        />
        {
          remove ? (
            <button className={Style.removeButton} onClick={remove}>
              <img alt="Chevron" src={Exit} className={Style.icon}/>
            </button>
          ) : null
        }
      </InputGroup>
    </>
  )
}


export default SearchComponent;