import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {tap,catchError} from 'rxjs/operators'
import { Category } from '../category/category';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

 // path = "http://localhost:3000/categories"
 path = environment.API_URL


  constructor(private http: HttpClient) { }
  getCategories():Observable<Category[]>{
    
    
    return this.http.get<Category[]>(this.path+"/categories").pipe
    (
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );  
  }
  handleError(err:HttpErrorResponse)
  {
    let errorMessage =""
    if(err.error instanceof ErrorEvent)
    {
      errorMessage ="Bir hata oluştu."+ err.error.message
    }
    else{
      errorMessage="Sistemsel bir hata oluştu."
    }
    return throwError(errorMessage)
  }
}