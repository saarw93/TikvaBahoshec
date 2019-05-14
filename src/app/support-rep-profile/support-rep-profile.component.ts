import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../firebase/firestore/firestore.service';
import { element } from '@angular/core/src/render3';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-support-rep-profile',
  templateUrl: './support-rep-profile.component.html',
  styleUrls: ['./support-rep-profile.component.scss'],
})

export class SupportRepProfileComponent implements OnInit {
  chatReadyStatus=false;
  openChatList : any =[];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private userAuth: AngularFireAuth,
    private firestore: FirestoreService,
    private global: GlobalService
    
    ) { }
    
  ngOnInit() {
    this.firestore.getOpenChatRooms().subscribe(result => {
      result.forEach(element => {
        this.openChatList.push(element); 
      });
    });

  }
    
  async logout() {
    const alert = await this.alertController.create({
      header: 'התנתק',
      message: 'אתה עומד להתנתק עכשיו',
      buttons: ['סלמתאק', 'לא לא']
    });
    alert.present();
  }




  readyForChat() {
    this.global.readyForChat();
  }

  scrollToElement(e): void {
    this.global.scrollToElement(e);
  }

  readyForChatColor(e){
    

  }


  supportId(id){
      console.log(this.openChatList);
     if(id==null){
        return "NULL"
     }
     else{
      let name = '';
      this.firestore.getSupportRepName(id).subscribe(result => console.log(result));
      return name;
     }
    

  }

  
}
