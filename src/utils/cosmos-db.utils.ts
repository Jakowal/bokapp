import {BookModel} from "../models/BookModel";

export const transformServerResponse = (response: any): BookModel[] => {
  console.log(response);
  return [];
}
/*response.map(entry => {
  const transformedObject: any = {};
  Object.entries(entry).map(value => transformedObject[BookModelFieldTranslationsFromNorwegian[value[0]]] = value[1])
  return transformedObject;
});*/

export const searchBookByTitle = async (/*title: string*/): Promise<any> => {
  return await fetch('/api/searchBooks');
}