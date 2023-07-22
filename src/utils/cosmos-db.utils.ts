import {
  BookModel,
} from "../models/BookModel";

export const searchBookByTitle = async (searchFields?: any): Promise<any> => {
  const url = process.env.REACT_APP_LOCAL ? 'http://localhost:7071/api/searchBooks' : '/api/searchBooks';
  const params = searchFields ?
    Object.entries(searchFields).map(([field, value]) => `${field}=${value}`) : undefined;
  return fetch(`${url}${params ? `?${params.join('&')}` : ''}`);
}

export const ExcelDateToJSDate = (excelDate: number) => {
  var utc_days  = Math.floor(excelDate - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = excelDate - Math.floor(excelDate) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
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