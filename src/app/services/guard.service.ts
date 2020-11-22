import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  private hasPredicted:boolean = false;
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.hasPredicted) {
      this.router.navigate(["/predict"]);
    }else{
      return true;
    }
  }

  setPredictionStatus(){
    this.hasPredicted = true;
  }
}
