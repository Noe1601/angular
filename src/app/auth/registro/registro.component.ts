import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registroForm: FormGroup | undefined;
  
  constructor(private fb: FormBuilder,
    private router: Router, private activated: ActivatedRoute, private _usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    })
  }

  limpiarFormulario(){
    this.registroForm?.reset();
  }

  crearUsuario(){

    const { nombre } = this.registroForm?.value;

   this._usuarioService.registrarUsuario(this.registroForm?.value).subscribe( resp => {
     
    this.limpiarFormulario();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${ nombre } fue registrado exitosamente!`,
      showConfirmButton: false,
      timer: 2000
    });

    this.router.navigateByUrl('login')
   });

  }

}
