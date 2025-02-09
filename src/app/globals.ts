import { Injectable,  NgZone} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


declare var require: any;
@Injectable()
export class Globals {

  pushObject;
  constructor(
    public alertController: AlertController,
    private router:Router,
    private zone: NgZone
    ) {
  }
  userCartCount: string = (localStorage.getItem('userCartCount') == null)? "0" : localStorage.getItem('userCartCount');
  updateCartCount(cartCount: string) {
    localStorage.setItem('userCartCount', cartCount);
    this.userCartCount = cartCount;
  }
  
  userWishListCount: string = (localStorage.getItem('userWishListCount') == null)? "0" : localStorage.getItem('userWishListCount');
  updateWishlistCount(wishlistCount: string) {
    localStorage.setItem('userWishListCount', wishlistCount);
    this.userWishListCount = wishlistCount;
  }

  httpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + (localStorage.getItem("user")?JSON.parse(localStorage.getItem("user"))['data']['token']:'')
      })
    }
  }

  httpOptionsWithoutContentType(): any {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + (localStorage.getItem("user")?JSON.parse(localStorage.getItem("user"))['data']['token']:'')
      })
    }
  }

  headerType = "home"
  updateHeaderType(type: string) {
    this.headerType = type;
  }
  async successAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  checkLogin(){
    if(localStorage.getItem("user")){
      return true;
    }else{
      return false;
    }
  }

  removePush() {
    this.pushObject.unregister();
    this.pushObject.on('unregister').subscribe((data: any) => {
      console.log('-----Push Disabled----');
    });
  }
  async presentConfirm(message,navigateUrl,params,navigateParamValue) {
    let alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'View',
          handler: () => {
            this.router.navigate([navigateUrl], { queryParams: { params: navigateParamValue } });
            //this.router.navigate([navigateUrl]);
          }
        }
      ]
    });
    await alert.present();
  }
}
