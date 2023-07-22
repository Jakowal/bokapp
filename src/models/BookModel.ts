export interface BookModel   {
  id?: string;
  authorLastName?: string;
  authorFirstName?: string
  title?: string;
  price?: string;
  condition?: string;
  totalprice?: number,
  sold?: string;
  category?: string;
  subtitle?: string;
  soldFor?: string;
  soldTo?: string;
  catalogueNumber?: number;
  catalogueBookNumber?: number,
  saleDate?: Date;
  bookNumber?: number,
  catalogueEntry?: string;
  newCatalogueEntry?: string;
  string?: string;
  comma?: string;
  colon?: string;
  authorEntry?: string;
  publishedPlace?: string;
  publishedYear?: string;
  totalNumberPublished?: number,
  subCategory?: string;
  firstLetter?: string;
  fulAuthorName?: string;
  catalogueEntrySubNumber?: string;
  comment?: string;
  boughtFor?: string;
  amountBoughtFor?: number,
  edition?: string;
  numberOfBooks?: number,
  gainOrLoss?: string;
  gainOrLossTotal?: number,
  purchaseDate?: Date;
  registeredDate?: Date;
  alternateName?: string;
  placeReference?: string;
  format?: string;
  binding?: string;
  pageCount?: string;
  soldStatisticsName?: string;
  totalPageCount?: string;
  firstEditionTest?: boolean;
  totalFirstEditionCount?: number,
  categoryShortName?: string;
  categoryNumber?: string;
  catalogueEntryShort?: string;
  soldText?: string;
  nameSorting?: string;
  store?: string;
  firstLetterCategory?: string;
  catalogueEntryShortSubPlace?: string
  todaysDate?: string
}
export const BookModelFieldTranslationsFromEnglish: {[key in keyof BookModel]: string } = {
  id: "id",
  bookNumber: 'boknummer',
  authorLastName: 'Forfatter etternavn',
  authorFirstName: 'Forfatter fornavn',
  title: 'Tittel',
  price: 'Pris',
  condition: 'Tilstand',
  totalprice: 'Totalpris',
  sold: 'Solgt',
  category: 'Kategori',
  subtitle: 'Undertittel',
  soldFor: 'Solgt for',
  soldTo: 'Solgt til',
  catalogueNumber: 'Katalog nr.',
  catalogueBookNumber: 'katalogboknummer',
  saleDate: 'Salgsdato',
  catalogueEntry: 'kataloginnskrift',
  newCatalogueEntry: 'Ny kataloginnskrift',
  string: 'Streng',
  comma: 'Komma',
  colon: 'Kolon',
  authorEntry: 'Forfatterinnskrift',
  publishedPlace: 'Utgivelsessted',
  publishedYear: 'Utgivelsesår',
  totalNumberPublished: 'Antall eks.',
  subCategory: 'Underkategori',
  firstLetter: 'Forbokstav',
  fulAuthorName: 'Fult forfatternavn',
  catalogueEntrySubNumber: 'Kataloginnskrift u nr',
  comment: 'Kommentar',
  boughtFor: 'Kjøpt for',
  amountBoughtFor: 'Sum kjøpt for',
  edition: 'Utgave',
  numberOfBooks: 'Antall verk',
  gainOrLoss: 'Gevinst eller tap',
  gainOrLossTotal: 'Sum gevinst eller tap',
  purchaseDate: 'Kjøpsdato',
  registeredDate: 'Registreringsdato',
  alternateName: 'Alternativt navn',
  placeReference: 'Plassreferanse',
  format: 'Format',
  binding: 'Innbinding',
  pageCount: 'Sideantall',
  soldStatisticsName: 'Solgtstatistikknavn',
  totalPageCount: 'Sum sideantall',
  firstEditionTest: 'Førsteutgavetest',
  totalFirstEditionCount: 'Sum av førsteutgaver',
  categoryShortName: 'Kortnavn kategori',
  categoryNumber: 'kategorisorteringsnummer',
  catalogueEntryShort: 'kataloginnskrift kort',
  soldText: 'Solgttekst',
  nameSorting: 'Navnesortering',
  store: 'Antikvariat',
  firstLetterCategory: 'Forbokstav kategori',
  catalogueEntryShortSubPlace: 'kataloginnskrift kort u plass',
  todaysDate: 'd dato',
}