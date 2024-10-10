import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generar-solicitud',
  templateUrl: './generar-solicitud.component.html',
  styleUrls: ['./generar-solicitud.component.css']
})
export class GenerarSolicitudComponent implements OnInit {

  solicitudForm: FormGroup;
  mostrarAreaS: boolean = true;
  mostrarConsulta: boolean = true;

  descripcionArr: string[] = [ ]

  descripcionSalud:string[] = [
    '-- Seleccione una Opcion --',
    'Tratamiento',
    'Consultas',
    'Cirugias',
    'Medicamentos',
    'Insumos'
  ] 

  descripcionJuridico: string[] = [
    '-- Seleccione una Opcion --',
    'Asesoria',
    'Consultas',
    'Tramites',
    'Documentos',
    'Procesos'
  ]

  descripcionEducacion: string[] = [
    '-- Seleccione una Opcion --',
    'Pagos',
    'Cupos',
    'Materiales y Utiles',
    'Becas'
  ]

  descripcionAyudas: string[] = [
    '-- Seleccione una Opcion --',
    'Alimentaria',
    'Economica',
  ]

  descripcionCredito: string[] = [
    '-- Seleccione una Opcion --',
    'Remodelacion',
    'Articulos',
    'Vehiculo',
    'Vivienda'
  ]

  constructor(
    private _fb: FormBuilder
  ) { 
    this.solicitudForm = this._fb.group({
      tipoS: [''],
      areaS: [{value: '', disabled: true}],
      descripcionS: [{value: '', disabled: true}],
      tipoConsulta: [{value: '', disabled: true}],
    });
  }

  ngOnInit(): void {
    this.solicitudForm.get('areaS')?.disable()
    this.solicitudForm.get('descripcionS')?.disable()

    this.solicitudForm.get('tipoS')?.valueChanges.subscribe(valor => {
      this.validarSelectArea(valor);
    });

    this.solicitudForm.get('areaS')?.valueChanges.subscribe(valor => {
      this.validarSelectDescripcion(valor);
    });

    this.solicitudForm.get('descripcionS')?.valueChanges.subscribe(valor => {
      if(valor == 2 && this.solicitudForm.get('areaS')?.value == 1){
        this.mostrarConsulta = false;
        this.solicitudForm.get('tipoConsulta')?.enable()
      }else{
        this.mostrarConsulta = true;
        this.solicitudForm.get('tipoConsulta')?.disable()
      }
    });
  }

  validarSelectArea(valor: any): void {
    if(valor != 0){
      this.solicitudForm.get('areaS')?.setValidators([Validators.required]);
      this.solicitudForm.get('areaS')?.enable()
    }else{
      this.solicitudForm.get('areaS')?.setValidators(null);
      this.solicitudForm.get('areaS')?.disable()
    }
  }

  validarSelectDescripcion(valor: any): void {
    if(valor != 0 && this.solicitudForm.get('tipoS')?.value != 0){
      this.rellenarDescripcion(valor);
    }else{
      this.solicitudForm.get('descripcionS')?.setValidators(null);
      this.solicitudForm.get('descripcionS')?.disable()
    }
  }

  rellenarDescripcion(n: any): void {    
    switch(n){
      case "1":
        this.descripcionArr = []
        this.descripcionArr.push(...this.descripcionSalud);
        break;
      case "2":
        this.descripcionArr = []
        this.descripcionArr.push(...this.descripcionJuridico);
        break;
      case "3":
        this.descripcionArr = []
        this.descripcionArr.push(...this.descripcionEducacion);
        break;
      case "4":
        this.descripcionArr = []
        this.descripcionArr.push(...this.descripcionAyudas);
        break
      case "5":
        this.descripcionArr = []
        this.descripcionArr.push(...this.descripcionCredito);
        break;
    }

    this.solicitudForm.get('descripcionS')?.setValue('0');
    this.solicitudForm.get('descripcionS')?.setValidators([Validators.required]);
    this.solicitudForm.get('descripcionS')?.enable()
  }
}
