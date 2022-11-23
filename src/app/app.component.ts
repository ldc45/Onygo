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
  showMe: boolean = false

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
public nomMonnaie : any;
public temp : any;
public humidity : any;
public windSpeed : any;
public cityName: any;
public feels: any;
public date: any;
public flagdepart :any;
public flagarrive : any;
public symboleDevisedepart: any;
public symboleDevisearrive: any;
public jour:any;
public continent : any;
public capitals: string[] = []; //public capitals: string[]; puis initialisation

public photodeProfilKilian ="assets/images/photo-profil-Kilian.jpg"
public photodeProfilLudo ="assets/images/photo-profil-Ludo.jpg"
public photodeProfilMika ="assets/images/photo-profil-Michael.jpg"

private cleApi = "313b518f76372b10bb570988";
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
  
  this.showMe=!this.showMe

  return this.http.get(`https://restcountries.com/v2/capital/${this.inputDepart.value}`)
  .subscribe((data:any) => {console.log(this.codeDepart= data[0]['currencies'][0]['code']),
                             this.flagdepart=data[0].flag;
                             this.symboleDevisedepart=data[0].currencies[0].symbol;
 
   return this.http.get(`https://restcountries.com/v2/capital/${this.inputDestination.value}`)
   .subscribe((data:any) => {this.codeDestination=data[0]['currencies'][0]['code'],data[0]['currencies'][0]['name'],
                               this.flagarrive=data[0].flag;
                               this.symboleDevisearrive=data[0].currencies[0].symbol;
 
   return this.http.get(`https://v6.exchangerate-api.com/v6/${this.cleApi}/pair/${this.codeDepart}/${this.codeDestination}/${this.budget.value}`)
   .subscribe((data:any) => {this.montant = data.conversion_result.toFixed(0);
 
  return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.inputDestination.value}&lang=fr&appid=${this.cleApi2}&units=metric`)
  .subscribe((data:any) => { 
  this.codeImage = data['weather'][0]['icon'], 
  this.cityName= data.name;
  this.temp  = `${data.main.temp.toFixed(0)}°C`;
  this.description = data.weather[0].description;
  this.feels = `${data.main.feels_like.toFixed(0)}°C`;
  this.humidity = data.main.humidity;
  this.windSpeed = data.wind.speed;
  this.date =  new Date().toLocaleString('fr-FR', {timeZone: 'Europe/Paris'}); 

  return this.http.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.inputDestination.value}&cnt=5&lang=fr&appid=${this.cleApi2}&units=metric`)
  .subscribe((data:any) => { 
 
   const jourSemaine = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi', 'Vendredi', 'Samedi'] 
 
   for (let i = 1, j = 0; i<5; i++, j++){
     
     const dt = data.list[i].dt
     let im = document.createElement('img')
     im.src =`http://openweathermap.org/img/wn/${data.list[i]['weather'][0]['icon']}.png`
 
     let parJour = document.createElement('p')
     parJour.innerText = jourSemaine[new Date(dt*1000).getDay()]
 
     let tempPrev = document.createElement('p')
     tempPrev.innerText = `${data.list[i].temp.day.toFixed(0)}°C`
 
     const datemeteo = document.querySelectorAll('.btn-meteo')
 
     datemeteo[j]?.appendChild(parJour)  
     
     datemeteo[j]?.appendChild(tempPrev)
     datemeteo[j]?.appendChild(im)
   }
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
 });
 }
 }


//  this.montant = new Intl.NumberFormat(`${this.langage}-${this.alphaCode}`, { style: 'currency', currency: `${this.codeDestination}` }).format(data.conversion_result);

//!ATTENTION NE PAS SUPPRIMER BOUCLE CAPITALS
//   return this.http.get(`https://restcountries.com/v2/all`)
//   .subscribe((data:any) => {
//     data.forEach((element: { capital: any; })  => { 
//       if(element.capital != undefined){
//     this.capitals.push(element.capital);
//       }
//     });  
// console.log(this.capitals.sort());
 



//<option *ngFor="let capital of capitals" value="'{{capital}}">{{ capital }}</option>