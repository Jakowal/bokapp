import { Form, InputGroup } from "react-bootstrap";
import Style from './index.module.scss';
import { BookModel, BookModelFieldTranslationsFromEnglish } from "../../models/BookModel";
import Exit from "../../icons/exit.svg";

interface Props {
  setTextValue: (newTerm: string) => void;
  bookModelField: string;
  defaultValue: string;
  remove?: () => void;
  onSubmit?: () => void;
}

const TextInputComponent = (
  {
    setTextValue,
    bookModelField,
    defaultValue,
    remove,
    onSubmit
  }: Props
) => {

  return (
    <>
      <InputGroup className={Style.inputField}>
        <InputGroup.Text className={Style.inputText}>{ BookModelFieldTranslationsFromEnglish[bookModelField as unknown as keyof BookModel] || bookModelField }</InputGroup.Text>
        <Form.Control
          defaultValue={defaultValue}
          onChange={change => setTextValue(change.target.value)}
          onKeyDown={keypress => {
            if (keypress.key === 'Enter' && onSubmit) {
              keypress.preventDefault();
              onSubmit();
            }
          }}
          className={Style.textInputField}
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


export default TextInputComponent;