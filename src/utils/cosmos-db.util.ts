import {
  BookModel,
} from "../models/BookModel";

export const searchBook = async (token: string, searchFields?: any): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks';
  const params = searchFields ?
    Object.entries(searchFields).map(([field, value]) => field && value ? `${field}=${value}` : null) : undefined;

  return fetch(`${url}?${params?.join('&')}${params ? '&' : ''}authorization=${token}`);
}

export const addBook = async (bookToAdd: BookModel): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/addBook' : '/api/addBook';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(bookToAdd),
  });
}

export const editBook = async (bookToAdd: BookModel): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/editBook' : '/api/editBook';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(bookToAdd),
  });
}

export const formatBooks = (books: BookModel[]) =>
  books.map(book => ({
    ...book,
    saleDate: book.saleDate ? new Date(book.saleDate) : undefined,
    purchaseDate: book.purchaseDate ? new Date(book.purchaseDate) : undefined,
    registeredDate: book.registeredDate ? new Date(book.registeredDate) : undefined,
    lastChanged: book.lastChanged ? new Date(book.lastChanged) : undefined,
  }));

export {}