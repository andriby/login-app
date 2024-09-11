import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import IDatos from '../interface/IDatos.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  url: string = "http://localhost:3001"

  login(correo: string, password: string): Observable<any> {
    const loginUrl = `${this.url}/api/auth`;
    const body ={ email: correo, password_usuario: password };
    return this._http.post(loginUrl, body);
  }

  register(datos: IDatos): Observable<any> {
    const registerUrl = `${this.url}/api/persona/register`;
    const body ={
      ci_persona: datos.ci_persona,
      nombre_persona: datos.nombre_persona,
      apellido_persona: datos.apellido_persona,
      fecha_nacimiento: datos.fecha_nacimiento,
      email: datos.email,
      password_usuario: datos.password_usuario,
      img_seguridad: "datos"
    };
    return this._http.post(registerUrl, body);
  }
}
