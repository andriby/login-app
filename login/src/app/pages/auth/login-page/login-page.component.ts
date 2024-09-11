import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/utils/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginService, private router: Router) { 
    this.loginForm = this._fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ingresar(): void {
    if (this.loginForm.valid) {
      this._loginService.login(this.loginForm.value.correo, this.loginForm.value.password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['/bienvenido']);
        },
        (error) => {
          console.error('Error de inicio de sesión', error);
          alert('Error: ' + error.error?.message || 'Ocurrió un error inesperado.'); 
        }
      );
    }
  }
  
}
