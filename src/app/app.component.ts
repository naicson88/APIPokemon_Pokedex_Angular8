import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material';
import { PokemonModule } from './models/pokemon.module';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Pipe({
  name: 'appFilter'
})
export class AppComponent implements OnInit {
  displayInfo: string[] = ['posicao','imagem','nome','type'];


  constructor(private APIPokemonService: ApiService ){

  }


  title = 'APIPokemon';
  pokemons : any[] = [];
  erro: any;
  search: FormControl = new FormControl('');
  isSearching: boolean;
  searchPokemon: any
  pokemonFilter: any = {name:''}

  public pageSlice = this.pokemons.slice(0, 10);


  ngOnInit(): void {
    this.getServiceInfo()
  }

  getServiceInfo(){
    let pokemonData;
    
      for(let i = 1; i <= 150; i++){
        this.APIPokemonService.getDados(i).subscribe(data =>{
         
          pokemonData = {
            id: data.id,
            imagem: data.sprites.other.dream_world.front_default,
            name: data.name,
            type1: data.types[0].type.name,
           // type2: data.types[1].type.name
          }
  
          this.pokemons.push(pokemonData);
          console.log(this.pokemons);
          this.ordenacaoArrayAPI();
          //Chama o  PageSlice aqui para trazer logo quando carregar a pagina pela primeiza vez.
         this.pageSlice = this.pokemons.slice(0, 10);
    
        },error => {
          this.erro = error;
          console.log(this.erro);
        });
     } 
  }

   //Order o Array de pokemons pelo ID do Pokemon 
  ordenacaoArrayAPI(){
    this.pokemons.sort(function(a,b){
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    })
  }


  //Função de paginação para Angular Material
  OnPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    
    if(endIndex > this.pokemons.length){
      endIndex = this.pokemons.length;
    }
    this.pageSlice = this.pokemons.slice(startIndex, endIndex);
  }

  //Caso procure um pokemon, o Array vai trazer todos os itens, não apenas dez
  onFiltro(event){
    if(event.target.value != ''){
      let endIndex = this.pokemons.length;
      this.pageSlice = this.pokemons.slice(0, endIndex);
    } else {
      this.pageSlice = this.pokemons.slice(0, 10);
    }
    
  }

}

