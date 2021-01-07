import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private APIPokemonService: ApiService) { }

  pokemonDetalhe : any[] = [];

  ngOnInit() {
    this.Editar();
  } 
 
  Editar(){
    let id = localStorage.getItem("idPokemon");
    let pokemonInfo: any;
    let pokemonInfoTwo: any;

    this.APIPokemonService.getPokemonInfo(+id).subscribe(data =>{
      pokemonInfo = {
        name: data.name,
        numero: data.id,
        info: data.flavor_text_entries[7].flavor_text
      }
      
      this.APIPokemonService.getDados(+id).subscribe(info => {
        
          pokemonInfo.type1 = info.types[0].type.name,
          pokemonInfo.hability1 = info.abilities[0].ability.name,
          pokemonInfo.hability2 = info.abilities[1].ability.name,
          pokemonInfo.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          pokemonInfo.peso = info.weight
         // pokemonInfo.type2 = info.types[1].type.name

          if(info.types[1] != null || info.types[1] != undefined ){
            pokemonInfo.type2 = " / " + info.types[1].type.name
          }
      })
    
      this.pokemonDetalhe.push(pokemonInfo);

      console.log(this.pokemonDetalhe)

  })

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

}
