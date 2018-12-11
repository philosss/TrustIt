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

  current: ChainItem;
  chain: ChainItem[];
  errMsg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private viewCtrl: ViewController,
    private trustitProvider: TrustitProvider) {

    this.prodId = navParams.get('prodId');

    this.trustitProvider.getByKey(this.prodId)
      .subscribe(
        chain => {
          if(chain.length > 1) {
            chain.reverse();
            this.current = chain.pop();
            this.chain = chain;
          } else if (chain.length == 1) {
            this.current = chain[0];
          } else {
            this.current = new ChainItem({
               productId: "",
               owner: {
                  id: "Not found",
                  first: "",
                  last: ""
               },
               timestamp: ""
            });
          }
          
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
