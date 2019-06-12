import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/firebase/firestore/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class LockedRoomGuard implements CanActivate {

  occupied = false;
  chatId = '';

  constructor(
    private router: Router,
    private firestore: FirestoreService,
    private userAuth: AngularFireAuth,
    private global: GlobalService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      var url = new URL(window.location.href);
      var parameter = url.searchParams.get("supportRepId");
      // console.log(parameter);
      // console.log(this.userAuth.auth.currentUser);
      if (this.userAuth.auth.currentUser === null && parameter === null  ) {
        this.router.navigateByUrl('/');
        resolve(false);  
      }
        else if (parameter !== null) {
        resolve(true);
      } else if (this.userAuth.auth.currentUser !== null && this.userAuth.auth.currentUser.email !== null) {
        resolve(true);
      } else if (this.userAuth.auth.currentUser !== null && this.userAuth.auth.currentUser.isAnonymous) {
        resolve(true);
      }
      
    });
  }

}
