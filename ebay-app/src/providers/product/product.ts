import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Product } from "../../shared/product";
import { baseUrl } from "../../shared/baseUrl";
import { ProcessHttpmsgProvider } from "../process-httpmsg/process-httpmsg";
import { Http } from "@angular/http";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(public http: Http,
              private httpsMsg: ProcessHttpmsgProvider) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(baseUrl + 'products')
      .map(res => { return this.httpsMsg.extractData(res); })
      .catch(error => { return this.httpsMsg.handleError(error); });
  }

  getProduct(id: number): Observable<Product> {
    return  this.http.get(baseUrl + 'products/'+ id)
      .map(res => { return this.httpsMsg.extractData(res); })
      .catch(error => { return this.httpsMsg.handleError(error); });
  }

}
