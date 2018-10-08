import {Component, Inject, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductProvider} from "../../providers/product/product";
import {Product} from "../../shared/product";
import {ProductPage} from "../product/product";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  products: Product[];
  errMsg: string;

  constructor(public navCtrl: NavController,
              public productProvider: ProductProvider,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.productProvider.getProducts()
      .subscribe(
        products => this.products = products,
        errmess => this.errMsg = <any>errmess
      );
  }

  productSelected(event, product) {
    this.navCtrl.push(ProductPage, {
      product: product
    });
  }

}
