import {
  BookModel,
} from "../models/BookModel";

export const searchBookByTitle = async (searchTerm?: string, searchField?: string): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks'
  return fetch(`${url}${searchTerm ? `?${searchField}=${searchTerm}` : ''}`);
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