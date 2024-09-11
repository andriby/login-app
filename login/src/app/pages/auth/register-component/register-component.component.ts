import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/utils/services/login.service';
import IDatos from 'src/app/utils/interface/IDatos.interface';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginService) {
    this.registerForm = this._fb.group({
      ci_persona: ['', Validators.required],
      nombre_persona: ['', Validators.required],
      apellido_persona: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      email: ['', Validators.required],
      password_usuario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  registrar(): void {
    let datos: IDatos = {
      ci_persona: this.registerForm.value.ci_persona,
      nombre_persona: this.registerForm.value.nombre_persona,
      apellido_persona: this.registerForm.value.apellido_persona,
      fecha_nacimiento: this.registerForm.value.fecha_nacimiento,
      email: this.registerForm.value.email,
      password_usuario: this.registerForm.value.password_usuario,
      img_seguridad: ""
    };

    console.log('Datos a registrar:', datos);

    if (this.registerForm.valid) {
      console.log('Datos válidos:', datos);
      
      this._loginService.register(datos).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          alert('Registro exitoso');
        },
        (error) => {
          console.error('Error de registro', error);
          alert('Error: ' + error.error?.message || 'Ocurrió un error inesperado.'); 
        }
      );
    }
  }

}
