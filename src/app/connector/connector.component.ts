import { Component, OnInit } from '@angular/core';
import { ConnectorService } from './connector.service';
import { department } from '../modules/department.module';
import { FormGroup, FormBuilder, FormControlName, Validators, FormControl } from '@angular/forms';
import { municipality } from '../modules/municipality.module';

@Component({
  selector: 'newwork-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})
export class ConnectorComponent implements OnInit {
  public finderForm: FormGroup;
  public findByNameForm: FormGroup;
  constructor(private connectorService: ConnectorService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.initDepartmentList();
  }
  public z: number = 1;
  private initForm() {
    this.finderForm = this.fb.group({
      'departmentId': new FormControl('', [Validators.required]),
    })
    this.findByNameForm = this.fb.group({
      'nameTo': new FormControl('', [Validators.required]),
    })
  }
  public departmentList: Array<department> = [];
  private initDepartmentList() {
    this.connectorService.findDepartments()
      .subscribe(data => {
        if (data != null) {
          this.errorCount = 0;
          this.departmentList = data;
        }
      }, error => {
        setTimeout(() => {
          if (this.errorCount < 5) {
            this.errorCount++
            this.initDepartmentList();
          }
        }, 2000);
      })
  }

  public initializerMunicipality() {
    const forControl = this.finderForm.value;
    this.initializerMunicipalityList(forControl.departmentId);
  }
  private errorCount = 0;
  public municipalityList: Array<municipality> = [];
  public municipalityListBackup: Array<municipality> = [];
  private initializerMunicipalityList(id) {
    if (id != "") {
      this.connectorService.findMunicipalitiesById(id)
        .subscribe(data => {
          if (data != null) {
            this.errorCount = 0;
            this.municipalityList = data;
            this.municipalityListBackup = this.municipalityList;
          }
        }, error => {
          setTimeout(() => {
            if (this.errorCount < 5) {
              this.errorCount++;
              this.initializerMunicipalityList(id);
            }
          }, 2000);
        })
    } else {
      this.municipalityList = [];
      this.municipalityListBackup = [];
    }

  }

  public findByName() {
    const forControl = this.findByNameForm.value;
    if (forControl.nameTo.length > 3) {
      this.municipalityList = [];
      this.municipalityListBackup.forEach(data => {
        if (data.descripcion.toLowerCase().includes(forControl.nameTo.toLowerCase()) == true) {
          this.municipalityList.push(data);
        }
      })
    } else {
      this.municipalityList = this.municipalityListBackup;
    }
  }
}
