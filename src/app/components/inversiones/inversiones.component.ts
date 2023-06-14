import { Component } from '@angular/core';
import { InversionesService } from 'src/app/services/inversiones.service';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css']
})
export class InversionesComponent {
  inversionesData: any[] = [];

  constructor(private inversionesService: InversionesService) {}

  ngOnInit() {
    this.getInversionesData();
  }

  getInversionesData() {
    this.inversionesService.getJSON('/inversiones').subscribe(
      (data: any) => {
        this.inversionesData = data.members;
      },
      (error: any) => {
        console.error('Error al obtener los datos de inversión:', error);
      }
    );
  }
}
