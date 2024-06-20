import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = "http://localhost:3000/";  

  constructor(private http: HttpClient) { }

  addProduct(data: any,type:any): Observable<any> {
    if(type=='Add'){
    return this.http.post(this.apiUrl + "products", data);
  }else{
    return this.http.put(this.apiUrl + "products/"+data.id, data);
  }

  }

  getProduct(): Observable<any> {
    return this.http.get(this.apiUrl + "products");
  }
  updateProduct(id: any): Observable<any> {
    return this.http.get(this.apiUrl + "products/" + id);
  }
 deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + "products/" + id);
  }
}