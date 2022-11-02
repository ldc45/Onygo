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
public logo ="assets/images/Pink_Minimalist_Planet_Travel_Logo_Design_1.png"
public monTitre : string;
public monIntroduction : string;
public montant : any;
public codeDepart : any;
public codeDestination : any;
public codeImage : any;
public temp : any;
public description : any;
public image : any;
public rand = Math.floor(Math.random() * (10 - 1) + 1);

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

public  afficherResultat(){
console.log(this.rand)
 return this.http.get(`https://restcountries.com/v2/capital/${this.inputDepart.value}`)
.subscribe((data:any) => {this.codeDepart= data[0]['currencies'][0]['code']

 return this.http.get(`https://restcountries.com/v2/capital/${this.inputDestination.value}`)
 .subscribe((data:any) => {this.codeDestination=data[0]['currencies'][0]['code'],data[0]['currencies'][0]['name']

 return this.http.get(`https://v6.exchangerate-api.com/v6/${this.cleApi}/pair/${this.codeDepart}/${this.codeDestination}/${this.budget.value}`)
 .subscribe((data:any) => {this.montant = data.conversion_result.toFixed(2)

return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.inputDestination.value}&appid=${this.cleApi2}`)
.subscribe((data:any) => {this.temp = (data['main']['temp']-273.15).toFixed(0), this.codeImage = data['weather'][0]['icon'], this.description = data['weather'][0]['description']

return this.http.get(`https://api.unsplash.com/search/photos?client_id=${this.cleApi3}&query=${this.inputDestination.value}-background`)
.subscribe((data:any) => {this.image=data['results'][this.rand]['urls']['regular']

});
});
});
});
});
}
}
