import {
  BookModel,
  BookModelFieldTranslationsFromEnglish,
  BookModelFieldTranslationsFromNorwegian
} from "../models/BookModel";

export const transformServerResponse = (response: any): BookModel[] => response.map((entry: any) => {
    const transformedObject: any = {};
    Object.entries(entry).map(value => transformedObject[BookModelFieldTranslationsFromNorwegian[value[0]]] = value[1])
    return transformedObject;
  })

const transformToServerObject = (book: BookModel): any => {
  const transformedObject: any = {};
  Object.entries(book).map(([field, value]) => transformedObject[BookModelFieldTranslationsFromEnglish[field as keyof BookModel] as string] = value)
  return transformedObject;
}

export const searchBookByTitle = async (searchTerm?: string, searchField?: string): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks'
  return fetch(`${url}${searchTerm ? `?${searchField}=${searchTerm}` : ''}`);
}

export const addBook = async (bookToAdd: BookModel): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/addBook' : '/api/addBook';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(transformToServerObject(bookToAdd)),
  });
}

export const editBook = async (bookToAdd: BookModel): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/editBook' : '/api/editBook';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(transformToServerObject(bookToAdd)),
  });
}