import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Product } from "../../shared/product";
import { baseUrl } from "../../shared/baseUrl";
import { ChainItem } from "../../shared/chain_item";
import { Owner } from "../../shared/owner";

import { ProcessHttpmsgProvider } from "../process-httpmsg/process-httpmsg";
import { Http, Headers, Response } from "@angular/http";

/*
  Generated class for the TrustitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrustitProvider {
	  private resolveSuffix = '?resolve=true';
    private actionUrl: string;
    private headers: Headers;

    constructor(public http: Http,
                private httpsMsg: ProcessHttpmsgProvider) {
        this.actionUrl = '/api/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

	public getByKey(trustitKey: string): Observable<ChainItem[]> {
        return this.http.get(`http://localhost:3000/api/Trade?filter=%7B%22where%22%3A%20%7B%22good%22%3A%20%22resource%3Aorg.upm.trustit.network.Good%23${trustitKey}%22%7D%7D`)
            .map(res => { return this.extractChain(res); })
            .catch(error => { return this.httpsMsg.handleError(error); });
    }

    private extractChain(res: Response) {
        var chain = [];
        var resJson = res.json();

        for (let item of resJson) {

            var split = item["newOwner"].split("#");
            var typeClass = split[0].split(".");
            var ownerType = typeClass[typeClass.length - 1];

            chain.push({
                product: item["commodity"],
                owner: split[1],
                type: ownerType,
                timestamp: item["timestamp"]
            });
        }

        return chain;
    }


}
