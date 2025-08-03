import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../shared/header/header';
import { BolletteDetails } from './bollette-details/bollette-details';
import { AuthService } from '../../service/auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BolletteService } from '../../service/auth/bollette.service';
import { Bolletta } from '../../models/bolletta.model';
import { OrderByDateDescendingPipePipe } from "../../pipes/order-by-date-descending-pipe";

@Component({
  selector: 'app-bollette-list',
  imports: [Header, BolletteDetails, FormsModule, OrderByDateDescendingPipePipe],
  templateUrl: './bollette-list.html',
  styleUrl: './bollette-list.css',
})
export class BolletteList implements OnInit {
  protected auth = inject(AuthService);
  private bolletteService = inject(BolletteService);
  bollette: Bolletta[] = [];

  popupUpload = false;

  title: string = '';
  selectedFile!: File;

  ngOnInit() {
    this.bolletteService.getBollette().subscribe({
      next: (res) => (this.bollette = res),
      error: (err) => console.error('Errore caricamento Bollette: ', err),
    });
  }

  showPopupUpload() {
    this.popupUpload = true;
  }
  closePopupUpload() {
    this.popupUpload = false;
  }
  onDeleteBolletta(id: string) {
    this.bolletteService.deleteBolletta(id).subscribe({
      next: () => {
        this.bollette = this.bollette.filter((b) => b.id !== id);
      },
      error: (err) => console.error('Errore durante la cancellazione: ', err),
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('bolletta', this.selectedFile);

    this.bolletteService.uploadBolletta(formData).subscribe({
      next: (res) => {
        console.log('Upload Riuscito', res);
        this.popupUpload = false;
        this.bollette = [res.bolletta, ...this.bollette];
        form.reset();
      },
      error: (err) => {
        console.error('Errore durante upload: ', err);
      },
    });
  }
}
