import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { department } from '../modules/department.module';
import { municipality } from '../modules/municipality.module';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor(private http: HttpClient) { }
  //Este servicio busca la lista completa de departamentos
  public findDepartments() {
    let url: string = "https://pruebasasivamosffiebackend.ivolucion.com/api/common/ListDepartamento";
    return this.http.get<Array<department>>(url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }
  //Este servicio busca los municipios de un departamento por {ID}
  public findMunicipalitiesById(id: number) {
    let url: string = "https://pruebasasivamosffiebackend.ivolucion.com/api/common/ListMunicipiosByIdDepartamento?idDepartamento=" + id;
    return this.http.get<Array<municipality>>(url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }
}
