import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { NavigationService } from '../../../service/navigation.service';
import { CapitalizePipe } from "../../../pipes/capitalize-pipe";

@Component({
  selector: 'app-header',
  imports: [CapitalizePipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected nav = inject(NavigationService)
  protected auth = inject(AuthService)
  protected view = inject(NavigationService)

  onLogout(){
    this.auth.logout()
    this.view.setViewHome('login')
  }

}
