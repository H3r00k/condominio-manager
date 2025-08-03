import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Bolletta } from '../../../models/bolletta.model';
import { DateFormatPipeTsPipe } from '../../../pipes/date-format.pipe.ts-pipe';
import { AuthService } from '../../../service/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { CapitalizePipe } from "../../../pipes/capitalize-pipe";

@Component({
  selector: 'app-bollette-details',
  imports: [DateFormatPipeTsPipe, CapitalizePipe],
  templateUrl: './bollette-details.html',
  styleUrl: './bollette-details.css',
})
export class BolletteDetails {
  protected auth = inject(AuthService);
  private http = inject(HttpClient);

  @Input() bolletta!: Bolletta;
  @Output() delete = new EventEmitter<string>();

  onDeleteCard() {
    if (confirm('Sei sicuro di voler cancellare questa bolletta?')) {
      this.delete.emit(this.bolletta.id);
    } else {
      return;
    }
  }

  onDownloadBolletta() {
    this.http.get(this.bolletta.url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = this.getFileName(); // nome dinamico
        link.click();
        URL.revokeObjectURL(url); // pulizia memoria
      },
      error: (err) => {
        console.error('Errore nel download:', err);
      },
    });
  }

  getFileName(): string {
    const estensione = this.bolletta.url.split('.').pop();
    const titoloSanificato = this.bolletta.title
      .toLowerCase()
      .replace(/\s+/g, '-');

    const date = new Date(this.bolletta.createdAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;

    return `bolletta-${titoloSanificato}-${formattedDate}.${estensione}`;
  }
}
