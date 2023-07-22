import {
  BookModel,
} from "../models/BookModel";


const getHeaders = (tenantId: string) => {
  const headers = new Headers();
  headers.append('x-tenant-id', tenantId);
  return headers
}

export const searchBook = async (tenantId: string, searchFields?: any): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks';
  const params = searchFields ?
    Object.entries(searchFields).map(([field, value]) => field && value ? `${field}=${value}` : null) : undefined;
  return fetch(`${url}${params ? `?${params.join('&')}` : ''}`, {
    headers: getHeaders(tenantId),
  });
}

export const addBook = async (tenantId: string, bookToAdd: BookModel): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/addBook' : '/api/addBook';
  return fetch(url, {
    headers: getHeaders(tenantId),
    method: 'POST',
    body: JSON.stringify(bookToAdd),
  });
}

export const editBook = async (tenantId: string, bookToAdd: BookModel): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/editBook' : '/api/editBook';
  return fetch(url, {
    headers: getHeaders(tenantId),
    method: 'POST',
    body: JSON.stringify(bookToAdd),
  });
}