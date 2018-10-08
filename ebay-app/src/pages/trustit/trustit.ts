import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrustitPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
