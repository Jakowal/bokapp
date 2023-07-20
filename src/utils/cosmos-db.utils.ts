import { BookModel, BookModelFieldTranslationsFromNorwegian } from "../models/BookModel";

export const transformServerResponse = (response: any): BookModel[] => response.map((entry: any) => {
    const transformedObject: any = {};
    Object.entries(entry).map(value => transformedObject[BookModelFieldTranslationsFromNorwegian[value[0]]] = value[1])
    return transformedObject;
  })

export const searchBookByTitle = async (searchTerm?: string, searchField?: string): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks'
  return fetch(`${url}${searchTerm ? `?${searchField}=${searchTerm}` : ''}`);
}

export const addBook = async (bookToAdd: any): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/addBook' : '/api/addBook'
  const book = {
    "Forfatter etternavn": "PERSON",
    "Tittel": "TEST BOK",
    "Pris": 150,
    "Tilstand": "Omslaget lett revet i kantene. Materien ren. 189, 1, (2) s.",
    "Totalpris": 6143574,
    "Solgt": "",
    "Kategori": "Arkitektur",
    "Forfatter fornavn": "TEST",
    "Undertittel": "",
    "Solgt for": "",
    "Solgt til": "",
    "Katalog nr.": "",
    "boknummer": 2,
    "katalogboknummer": 5069,
    "Salgsdato": "2023-04-25T07:00:00.000Z",
    "kataloginnskrift": "BROCHMANN , Odd:  Om hus og land og menig mann [Hj E 3].",
    "Ny kataloginnskrift": "BROCHMANN , Odd: Om hus og land og menig mann Oslo.  J.W. Cappelens forlag. 1956.  8vo. Originalbind med omslag . Omslaget lett revet i kantene. Materien ren. 189, 1, (2) s. 1. utgave. [Hj E 3](5069).",
    "Streng": "",
    "Komma": ",",
    "Kolon": ":",
    "Forfatterinnskrift": "Brochmann ,",
    "Utgivelsessted": "Oslo",
    "Utgivelsesår": 2023,
    "Antall eks.": 1,
    "Underkategori": "",
    "Forbokstav": "B",
    "Fult forfatternavn": "BROCHMANN  Odd",
    "Kataloginnskrift u nr": "BROCHMANN , Odd: Om hus og land og menig mann Oslo.  1956.  Omslaget lett revet i kantene. Materien ren. 189, 1, (2) s.",
    "Kommentar": "",
    "Kjøpt for": "",
    "Sum kjøpt for": 3512322.75,
    "Utgave": "1. utgave",
    "Antall verk": 5253,
    "Gevinst eller tap": 150,
    "Sum gevinst eller tap": 2618951.25,
    "Kjøpsdato": "",
    "Registreringsdato": "2023-03-05T08:00:00.000Z",
    "Alternativt navn": "",
    "Plassreferanse": "Hj E 3",
    "Format": "8vo.",
    "Innbinding": "Originalbind med omslag ",
    "Sideantall": "",
    "Solgtstatistikknavn": "",
    "Sum sideantall": "5741794417015727,871",
    "Førsteutgavetest": 1,
    "Sum av førsteutgaver": 3517,
    "Kortnavn kategori": "arkit",
    "kategorisorteringsnummer": "",
    "kataloginnskrift kort": "BROCHMANN , Odd:  Om hus og land og menig mann",
    "Solgttekst": "",
    "Navnesortering": "Brochmann Odd",
    "Antikvariat": "gave ?",
    "Forbokstav kategori": "",
    "kataloginnskrift kort u plass": "BROCHMANN , Odd:  Om hus og land og menig mann",
    "d dato": "",
  }
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(book),
  });
}