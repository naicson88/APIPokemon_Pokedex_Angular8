import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material';
import { ApiService } from './services/api.service';
import {MatDialog} from '@angular/material/dialog';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Pipe({
  name: 'appFilter'
})
export class AppComponent implements OnInit, AfterViewInit {
  displayInfo: string[] = ['posicao','imagem','nome','type'];


  constructor(private APIPokemonService: ApiService, public dialog: MatDialog, 
    private actRoute:ActivatedRoute
    ){

  }

  title = 'APIPokemon';
  pokemons : any[] = [];
  pokemonDetalhe : any[] = [];
  erro: any;
  search: FormControl = new FormControl('');
  typeofpokemon: string="";
  pokemonFilter: any = {name:''}
  
  public pageSlice = this.pokemons.slice(0, 10);


  ngOnInit(): void {
    this.getServiceInfo();

  }

  ngAfterViewInit(){
    
  }

  getServiceInfo(){
    let pokemonData;
    
      for(let i = 1; i <= 550; i++){
        this.APIPokemonService.getDados(i).subscribe(data =>{
         
          pokemonData = {
            id: data.id,
            imagem: data.sprites.other.dream_world.front_default,
            name: data.name,
            type1: data.types[0].type.name,
           // type2: data.types[1].type.name
          }

          if(data.types[1] != null || data.types[1] != undefined ){
            pokemonData.type2 = data.types[1].type.name
          }
          this.pokemons.push(pokemonData);
          //console.log(this.pokemons);
          this.ordenacaoArrayAPI();
          //Chama o  PageSlice aqui para trazer logo quando carregar a pagina pela primeiza vez.
         this.pageSlice = this.pokemons.slice(0, 10);
    
        },error => {
          this.erro = error;
          console.log(this.erro);
        });
     } 
  }

  openDetails(event){

    const id = event.target.value;
    localStorage.setItem("idPokemon", id);

    /*this.APIPokemonService.getPokemonInfo(id).subscribe(data =>{
        pokemonInfo = {
          name: data.name
        }
        this.pokemonDetalhe.push(pokemonInfo);
        console.log(this.pokemonDetalhe)
    })*/
    
    const dialogRef = this.dialog.open(PokemonDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Result:${result} `);
    })  
  }

 

   //Ordena o Array de pokemons pelo ID do Pokemon 
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

  styleOfTypePokemon(pokemon){
    //let spanType = document.getElementsByClassName(".typeofpokemon");
    
    switch(pokemon){
      case 'fire': 
        return 'red';
      case 'water':
        return '#00BFFF'
      case 'grass':
        return '#228B22'
      case 'poison':
        return '#9400D3'
      case 'flying': 
        return '#FFA07A'
      case 'bug':
        return '#20B2AA'
      case 'normal':
        return '#6B8E23'
      case 'electric':
        return 'yellow'
      case 'ground':
          return '#B8860B'
      case 'fairy':
        return '#DDA0DD'
      case 'fighting':
        return '#363636'
      case 'psychic':
        return '#4169E1'
      case 'rock':
        return '#8B7355'
      case 'steel':
        return '#A9A9A9'
      case 'dragon':
        return '#FFA500'
      case 'ghost':
        return '#E6E6FA'
      case 'ice':
        return '#1E90FF'
      case 'dark':
        return '#191970'
      
    }
  
  }

  //Metodo responsavel por abrir o dialog com os detalhes do Pokemon

 

}

 




