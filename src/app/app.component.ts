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
public monTitre : string;
public monIntroduction : string;
public monPaysDepart : string;
public monPaysArrivee : string;
public montant : any;
public codeDepart : any;
public codeDestination : any;
private cleApi = "a92b35e3151ed3389e3aac02";

//Retour sur les formcontrol de l'html
inputDepart = new FormControl('');
inputDestination = new FormControl('');
budget= new FormControl('');

constructor(private http: HttpClient){


this.monTitre = "Onygo";
this.monIntroduction = "Avec Onygo voyage à travers le monde !";
this.monPaysDepart= "Insérez le pays de départ";
this.monPaysArrivee= "Insérez le pays de d'arrivée";
 
}


ngOnInit():void{

}
public  afficherResultat(){

 return this.http.get(`https://restcountries.com/v2/capital/${this.inputDepart.value}`)
  .subscribe((data:any) => {alert(this.codeDepart= data[0]['currencies'][0]['code'])

 return this.http.get(`https://restcountries.com/v2/capital/${this.inputDestination.value}`)
 .subscribe((data:any) => {alert(this.codeDestination=data[0]['currencies'][0]['code']),alert(data[0]['currencies'][0]['name'])

 return this.http.get(`https://v6.exchangerate-api.com/v6/${this.cleApi}/pair/${this.codeDepart}/JPY/${this.budget.value}`)
  .subscribe((data:any) => {alert(this.montant = data.conversion_result.toFixed(0))
   

});
});
});
}
}
