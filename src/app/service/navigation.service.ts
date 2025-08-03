import { inject, Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  private homePage = signal<'login' | 'register' | 'home' |   'bollette' | 'richieste'>('login');
  
  
  view = this.homePage.asReadonly();

  setViewHome(newView: 'login' | 'register' | 'home' |  'bollette' | 'richieste') {
    this.homePage.set(newView);

  }
  getView() {
    return this.homePage;
  }

  reset() {
    return this.homePage.set('login');
  }

  


}
