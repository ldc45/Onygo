import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Onygo';

//Déclaration des variables

public logo ="assets/images/logo.png"
public monTitre : string;
public monIntroduction : string;
public montant : any;
public codeDepart : any;
public codeDestination : any;
public codeImage : any;
public temperature : any;
public description : any;
public image : any;
public alphaCode : any;
public langage :any;

private cleApi = "a92b35e3151ed3389e3aac02";
private cleApi2 = "b9df352c5184221ff36bf83de98355c8";
private cleApi3 = "goLxS35I_CQHM3MjK7FPnznmQrKYGksKqEjSsu5UfrE";

//Retour sur les formcontrol de l'html
inputDepart = new FormControl('');
inputDestination = new FormControl('');
budget= new FormControl('');


constructor(private http: HttpClient){ 
this.monTitre = "Onygo";
this.monIntroduction = "Avec Onygo voyage à travers le monde !";
}

ngOnInit():void{

}

public afficherResultat(){

  return this.http.get(`https://restcountries.com/v2/capital/${this.inputDepart.value}`)
 .subscribe((data:any) => {this.codeDepart= data[0]['currencies'][0]['code']

  return this.http.get(`https://restcountries.com/v2/capital/${this.inputDestination.value}`)
  .subscribe((data:any) => {
    this.codeDestination=data[0]['currencies'][0]['code'],data[0]['currencies'][0]['name'], this.alphaCode=data[0]['alpha2Code'],console.log(data[0]['languages'][0]['iso639_1'])

  return this.http.get(`https://v6.exchangerate-api.com/v6/${this.cleApi}/pair/${this.codeDepart}/${this.codeDestination}/${this.budget.value}`)
  .subscribe((data:any) => {this.montant = new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${this.codeDestination}` }).format(data.conversion_result);

 return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.inputDestination.value}&appid=${this.cleApi2}`)
 .subscribe((data:any) => {this.temperature = (data['main']['temp']-273.15).toFixed(0), this.codeImage = data['weather'][0]['icon'], this.description = data['weather'][0]['description']

 return this.http.get(`https://api.unsplash.com/search/photos?client_id=${this.cleApi3}&query=${this.inputDestination.value}`)
 .subscribe((data:any) => {
  let section = document.createElement('section')
  section.className = 'gallery'
  for (let i = 0; i<3; i++){
    //console.log(data['results'][i]['urls']['regular'])
    let img = document.createElement('img')
    //Nous venons de créer un nouvel élément de type  img , mais qui n'est pas encore rattaché au DOM.
    img.src = data['results'][i]['urls']['regular']
    //La propriété className de l'interface Element récupère et définit la valeur de l'attribut class de l'élément spécifié.
    img.className = 'gallery--img'
    // Nous avons ensuite récupéré l'élément ayant pour class "gallery"
  
    const galleryContainers = document.querySelectorAll('.gallery__container');
   //Nous avons ajouté notre nouvel élément dans les enfants de l'élément 
    galleryContainers[i]?.appendChild(img) 
    //La propriété appendChild sur gallery peut être null, ce qui provoque une erreur.Nous pouvons utiliser l'opérateur de chaînage optionnel (?.) pour contourner ce problème.
   } 
  
  //this.image=data['results'][this.rand]['urls']['regular']

 });
 });
 });
 });
});
}
}
