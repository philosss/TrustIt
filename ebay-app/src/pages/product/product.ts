import { Component, Inject } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../shared/product';
import { TrustitPage } from '../trustit/trustit';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

	product: Product;

  	constructor(public navCtrl: NavController, public navParams: NavParams,
  		private modalCtrl: ModalController,
      @Inject('BaseURL') private BaseURL) {
  		this.product = navParams.get('product');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ProductPage');
  	}

    viewTrustitChain() {
        let modal = this.modalCtrl.create(TrustitPage);
        modal.present();
    }

}
