import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';


import { HeadComponent } from './components/head/head.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HeadComponent ,
    PokemonDetailComponent

  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    AppRoutingModule,
    MatDialogModule 
    
  ],
  providers: [HttpClient, ApiService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private apiService: ApiService){}
 }
