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



@NgModule({
  declarations: [
    AppComponent

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
    FilterPipeModule
    
  ],
  providers: [HttpClient, ApiService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private apiService: ApiService){}
 }
