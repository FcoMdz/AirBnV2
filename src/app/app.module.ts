import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { CardsComponent } from './components/cards/cards.component';
import { CasaComponent } from './components/casa/casa.component';
import { CasasService } from './services/casas.service';
import { PrincipalComponent } from './components/principal/principal.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//ngPrime
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { AnimateModule } from 'primeng/animate';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ConocenosComponent } from './components/conocenos/conocenos.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VideoPipe } from './video.pipe';
import { DudasComponent } from './dudas/dudas.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { SkinsComponent } from './components/skins/skins.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    PrincipalComponent,
    BusquedaComponent,
    CardsComponent,
    CasaComponent,
    ConocenosComponent,
    VideoPipe,
    DudasComponent,
    ReservacionesComponent,
    SkinsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SliderModule,
    CalendarModule,
    InputNumberModule,
    ChipModule,
    TagModule,
    AnimateModule,
    BrowserAnimationsModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    HttpClientModule
  ],
  providers: [CasasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
