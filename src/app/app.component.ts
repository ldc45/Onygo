import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Onygo';

//Déclaration des variables

public logo ="assets/images/logo.png"
public testimage ="assets/images/maldives.jpg"
public monTitre : string;
public monIntroduction : string;
public montant : any;
public codeDepart : any;
public codeDestination : any;
public codeImage : any;
public temp : any;
public humidity : any;
public windSpeed : any;
public cityName: any;
public feels: any;
public description : any;
public image : any;
public date: any;
public jour:any;
public continent : any;
public alphaCode : any;
public langage :any;



public rand = Math.floor(Math.random() * (10 - 1) + 1);

private cleApi = "a92b35e3151ed3389e3aac02";
private cleApi2 = "b9df352c5184221ff36bf83de98355c8";
private cleApi3 = "goLxS35I_CQHM3MjK7FPnznmQrKYGksKqEjSsu5UfrE";

//Retour sur les formcontrol de l'html
inputDepart = new FormControl('');
inputDestination = new FormControl('');
budget= new FormControl('');
data: any;

constructor(private http: HttpClient){ 
this.monTitre = "Onygo";
this.monIntroduction = "Avec Onygo voyage à travers le monde !";

}

ngOnInit():void{

}

public afficherResultat(){

  return this.http.get(`https://restcountries.com/v2/capital/${this.inputDepart.value}`)
 .subscribe((data:any) => {console.log(this.codeDepart= data[0]['currencies'][0]['code'])

  return this.http.get(`https://restcountries.com/v2/capital/${this.inputDestination.value}`)
  .subscribe((data:any) => {this.codeDestination=data[0]['currencies'][0]['code'],data[0]['currencies'][0]['name']
 
 this.continent = data[0].region
 
 this.date =  new Date().toLocaleString('fr-FR', {dateStyle: 'full',timeStyle:'medium',timeZone: `${this.continent}/${this.inputDestination.value}`});

  return this.http.get(`https://v6.exchangerate-api.com/v6/${this.cleApi}/pair/${this.codeDepart}/${this.codeDestination}/${this.budget.value}`)
  .subscribe((data:any) => {this.montant = new Intl.NumberFormat(`${this.langage}-${this.alphaCode}`, { style: 'currency', currency: `${this.codeDestination}` }).format(data.conversion_result);

 return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.inputDestination.value}&lang=fr&appid=${this.cleApi2}&units=metric`)
 .subscribe((data:any) => { 
 
 this.codeImage = data['weather'][0]['icon'], 
 this.cityName= data.name;
 this.temp  = `${data.main.temp.toFixed(0)}°C`;
 this.description = data.weather[0].description;
 this.feels = `${data.main.feels_like.toFixed(0)}°C`;
 this.humidity = data.main.humidity;
 this.windSpeed = data.wind.speed;


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









// const ApiKey = '2e240a6b9222d721e04ea6d8b538464c';


        
// function recherche() {
        


//   let villeSaisie = document.querySelector("#ID_inputcity").value;
  
//   let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${villeSaisie}&appid=${ApiKey}&units=metric&lang=fr`;

//    const date = new Date().toLocaleDateString(undefined, {dateStyle :'long'});


//   //let urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`


// fetch(urlApi).then((response) =>
// response.json().then((data) => {
// console.log(data);
// //document.querySelector('#ID_dateDuJour').innerHTML = date;



// })
// )
// }



// NE PAS TOUCHER LOL this.date =  new Date().toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
