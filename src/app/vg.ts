import { Injectable } from '@angular/core';
@Injectable()

export class VG {
  id: number = 0;
  pseudo : string = "";
  urlApi : string = 'https://hspt-api.azurewebsites.net/api/';  // URL de l'API
}

