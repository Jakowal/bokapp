import { BookModel, BookModelFieldTranslationsFromNorwegian } from "../models/BookModel";

export const transformServerResponse = (response: any): BookModel[] => response.map((entry: any) => {
    const transformedObject: any = {};
    Object.entries(entry).map(value => transformedObject[BookModelFieldTranslationsFromNorwegian[value[0]]] = value[1])
    return transformedObject;
  })

export const searchBookByTitle = async (title?: string): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks'
  return fetch(`${url}${title ? `?title=${title}` : ''}`);
}