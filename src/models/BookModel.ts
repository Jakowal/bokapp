export interface BookModel   {
  id?: string;
  authorLastName?: string;
  authorFirstName?: string
  title?: string;
  price?: string;
  condition?: string;
  sold?: string;
  category?: string;
  soldFor?: string;
  soldTo?: string;
  catalogueNumber?: number;
  catalogueBookNumber?: number,
  saleDate?: Date;
  bookNumber?: number,
  catalogueEntry?: string;
  newCatalogueEntry?: string;
  publishedPlace?: string;
  publishedYear?: string;
  subCategory?: string;
  firstLetter?: string;
  fulAuthorName?: string;
  catalogueEntrySubNumber?: string;
  comment?: string;
  boughtFor?: string;
  edition?: string;
  numberOfBooks?: number,
  purchaseDate?: Date;
  registeredDate?: Date;
  placeReference?: string;
  format?: string;
  binding?: string;
  soldStatisticsName?: string;
  categoryShortName?: string;
  catalogueEntryShort?: string;
  store?: string;
  firstLetterCategory?: string;
  lastChanged?: Date;
  userId?: string;
}
export const BookModelFieldTranslationsFromEnglish: {[key in keyof BookModel]: string } = {
  id: "id",
  authorLastName: 'Forfatter etternavn',
  authorFirstName: 'Forfatter fornavn',
  title: 'Tittel',
  price: 'Antatt verdi',
  condition: 'Tilstand',
  category: 'Kategori',
  catalogueBookNumber: 'Registreringsnummer',
  publishedPlace: 'Utgivelsessted',
  publishedYear: 'Utgivelsesår',
  comment: 'Kommentar',
  boughtFor: 'Kjøpt for',
  placeReference: 'Plassreferanse',
  binding: 'Innbinding',
  format: 'Format',
  store: 'Antikvariat',
  catalogueNumber: 'Katalog nr.',
  saleDate: 'Salgsdato',
  catalogueEntry: 'kataloginnskrift',
  newCatalogueEntry: 'Ny kataloginnskrift',
  subCategory: 'Underkategori',
  firstLetter: 'Forbokstav',
  fulAuthorName: 'Fult forfatternavn',
  catalogueEntrySubNumber: 'Kataloginnskrift u nr',
  edition: 'Utgave',
  numberOfBooks: 'Antall verk',
  purchaseDate: 'Kjøpsdato',
  registeredDate: 'Registreringsdato',
  soldStatisticsName: 'Solgtstatistikknavn',
  categoryShortName: 'Kortnavn kategori',
  catalogueEntryShort: 'kataloginnskrift kort',
  firstLetterCategory: 'Forbokstav kategori',
  bookNumber: 'boknummer',
  sold: 'Solgt',
  soldFor: 'Solgt for',
  soldTo: 'Solgt til',
  lastChanged: 'Sist Endret',
}