import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
// import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    public toastController: ToastController,
    // private loadingController: LoadingController
  ) { }

  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2000,
    });
    toast.present();
  }
}
