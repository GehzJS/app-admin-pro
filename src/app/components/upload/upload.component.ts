/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit, Input } from '@angular/core';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { ImageService } from 'src/app/services/image/image.service';
import { UserService } from 'src/app/services/user/user.service';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBERÍAS DE TERCEROS
/*====================================================================================*/
import Swal from 'sweetalert2';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class UploadComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Datos provenientes del componente de contenido.
  /*----------------------------------------------------------------------------------*/
  @Input() title = 'Default';
  @Input() temporal;
  @Input() image;
  @Input() model: any;
  @Input() collection: string;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    public activeModal: NgbActiveModal,
    private imageService: ImageService,
    private userService: UserService
  ) {}
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA SUBIR Y ACTUALIZAR UNA IMAGEN
  /*==================================================================================*/
  upload() {
    if (this.model && this.collection && this.image) {
      this.imageService
        .uploadImage(this.model._id, this.collection, this.image)
        .subscribe(
          (response: any) => {
            /*-----------------------------------------------------------------------*/
            /*  Operaciones para el usuario.
            /*-----------------------------------------------------------------------*/
            if (this.collection === 'users') {
              if (this.model._id === response.users._id) {
                /*-------------------------------------------------------------------*/
                /*  Si el usuario coincide con el actual se guardan sus cambios.
                /*-------------------------------------------------------------------*/
                this.userService.user = response.users;
                this.userService.saveLocalStorage(
                  response.users._id,
                  this.userService.token,
                  response.users
                );
              }
            }
            /*-----------------------------------------------------------------------*/
            /*  Operaciones para el hospital.
            /*-----------------------------------------------------------------------*/
            if (this.collection === 'hospitals') {
            }
            /*-----------------------------------------------------------------------*/
            /*  Operaciones para el doctor.
            /*-----------------------------------------------------------------------*/
            if (this.collection === 'doctors') {
            }
            this.activeModal.close();
            /*------------------------------------------------------------------------*/
            /*  Se notifica que el usuario se ha editado exitosamente.
            /*------------------------------------------------------------------------*/
            Swal.fire({
              title: 'Imagen editada!',
              text: `La imagen de ${this.model.name} se ha editado exitosamente.`,
              type: 'success'
            });
          },
          (error: any) => {
            /*--------------------------------------------------------------------------*/
            /*  Se notifica al usuario que ha ocurrido un error.
            /*--------------------------------------------------------------------------*/
            Swal.fire({
              title: '¡Algo ha ido mal!',
              text: 'Ha ocurrido un error al editar la imagen.',
              type: 'error'
            });
          }
        );
    }
  }
}
