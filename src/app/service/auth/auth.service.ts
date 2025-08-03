import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storage = inject(LocalStorageService);

  private currentUser = signal<User | null>(null);
  readonly user = this.currentUser.asReadonly();

  constructor() {
    const saved = this.storage.get<User>('currentUser');
    if (saved) {
      this.currentUser.set(saved);
    }
  }

  login(user: User) {
    this.currentUser.set(user);
    this.storage.set('currentUser', user);
  }

  logout() {
    this.currentUser.set(null);
    this.storage.remove('currentUser');
  }

  isLoggedIn = computed(() => !!this.currentUser());
}
