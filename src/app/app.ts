import { Component, inject } from '@angular/core';
import { Login } from "./pages/login/login";
import { NavigationService } from './service/navigation.service';
import { Register } from "./pages/register/register";
import { HomePage } from "./pages/home-page/home-page";
import { BolletteList } from "./pages/bollette-list/bollette-list";
import { TicketRequest } from "./pages/ticket-request/ticket-request";


@Component({
  selector: 'app-root',
  imports: [Login, Register, HomePage, BolletteList,  TicketRequest],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'super-condominio';
  protected nav = inject(NavigationService);
  protected view = this.nav.getView();
}
