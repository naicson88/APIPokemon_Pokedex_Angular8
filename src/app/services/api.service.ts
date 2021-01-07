import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonModule } from '../models/pokemon.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url = 'https://pokeapi.co/api/v2';

  constructor(private http:HttpClient) { }

  public getDados(index): Observable<any>{
    return this.http.get(`${this.base_url}/pokemon/${index}`);
  }

  public getPokemonDetails(pokemon: number | string): Observable<any>{
    return this.http.get<any>(this.base_url + 'pokemon/' + pokemon)
  }

  public getPokemonInfo(idPokemon): Observable<any>{
    return this.http.get(`${this.base_url}/pokemon-species/${idPokemon}`);
  }

}

