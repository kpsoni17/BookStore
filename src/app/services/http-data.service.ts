import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, retry, catchError, BehaviorSubject } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:3000/products";
  public changeCartCount = new BehaviorSubject('');

  // for setting headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  // Handle api errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Error Occured', error.error.message)
    }
    else {
      console.error(`Backend Returned Error' ${error.status},` + `body was : ${error.error}`)
    }
    return throwError(`Something bad happened`);
  };


  // creating Item
  createItem(item: any): Observable<Products> {
    return this.http.post<Products>(this.baseUrl, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  // get products list
  getData(): Observable<Products> {
    return this.http.get<Products>(this.baseUrl).pipe(retry(2), catchError(this.handleError));
  }
  // get data through id
  getDataById(id: string): Observable<Products> {
    return this.http.get<Products>(this.baseUrl + '/' + id).pipe(retry(2), catchError(this.handleError));
  }

  // updateItem
  updateItem(id: string, item: any): Observable<Products> {
    return this.http.put<Products>(this.baseUrl + '/' + id, JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  // delete
  deleteItem(id: string) {
    return this.http.delete<Products>(this.baseUrl + '/' + id, this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }
}
