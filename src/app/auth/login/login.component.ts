import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public data: any;
  public loginForm: FormGroup | undefined;

  constructor(private fb: FormBuilder,
    private router: Router, private activated: ActivatedRoute, private _usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  login(){
    this._usuarioService.login(this.loginForm?.value).subscribe( resp => {

      this.data = resp;

      if( this.data.Usuario){

        const { NOMBRE, ROL } = this.data.Usuario;
        this.router.navigateByUrl('/component/Asignaturas')
        this._usuarioService.guardarEnLocalStorage(NOMBRE,ROL);

      }else{

        Swal.fire(
          'Credenciales invalidas',
          `Intentelo de nuevo, verifique sus datos.`,
          'error'
        ); 

      }

    })
  }

}
