import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TrustitProvider } from '../../providers/trustit/trustit';

import { ChainItem } from '../../shared/chain_item';

/**
 * Generated class for the TrustitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trustit',
  templateUrl: 'trustit.html',
})
export class TrustitPage {

  prodId: string;

  chain: ChainItem[];
  errMsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private viewCtrl: ViewController,
    private trustitProvider: TrustitProvider) {

    this.prodId = navParams.get('prodId');

    this.trustitProvider.getByKey(this.prodId)
      .subscribe(
        chain => {
          this.chain = chain
        },
        errmess => this.errMsg = <any>errmess
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrustitPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
