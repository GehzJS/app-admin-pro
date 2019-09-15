/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { DoctorService } from 'src/app/services/doctor/doctor.service';
/*====================================================================================*/
/*  IMPORTACIONES DE MODELOS
/*====================================================================================*/
import { DoctorModel } from 'src/app/models/doctor.model';
/*====================================================================================*/
/*  IMPORTACIONES DE COMPONENTES
/*====================================================================================*/
import { ContentComponent } from 'src/app/components/content/content.component';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBERÍAS DE TERCEROS
/*====================================================================================*/
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/*====================================================================================*/
/*  CONFIGURACIONES DEL SERVICIO
/*====================================================================================*/
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class DoctorsComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Variables de doctores.
  /*----------------------------------------------------------------------------------*/
  doctors: DoctorModel[];
  active: string;
  /*----------------------------------------------------------------------------------*/
  /*  Variables de paginación.
  /*----------------------------------------------------------------------------------*/
  page: number;
  total: number;
  charging: boolean;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    private modalService: NgbModal,
    private doctorService: DoctorService
  ) {}
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    this.page = 0;
    this.total = 5;
    this.loadData(0);
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GARGAR LOS DOCTORES
  /*==================================================================================*/
  loadData(page: number) {
    this.charging = true;
    this.page += page;
    /*--------------------------------------------------------------------------------*/
    /* Se verifica que la paginación sea válida y se realiza la petición.
    /*--------------------------------------------------------------------------------*/
    if (this.page >= 0 || this.page <= this.total) {
      this.doctorService.getDoctors(this.page).subscribe((response: any) => {
        this.charging = false;
        this.doctors = response.doctors;
        this.total = response.total;
      });
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BUSCAR DOCTORES
  /*==================================================================================*/
  searchDoctor(keyword: string) {
    if (keyword !== '') {
      this.doctorService
        .searchDoctors(keyword)
        .subscribe((response: DoctorModel[]) => (this.doctors = response));
    } else {
      this.loadData(0);
    }
  }
  // modalSave() {
  //   Swal.fire({
  //     title: 'Agregar un nuevo doctor',
  //     input: 'text',
  //     inputPlaceholder: 'Ingrese el nombre del doctor.',
  //     type: 'info'
  //   }).then(name => {
  //     if (name.value) {
  //       this.save(name.value);
  //     }
  //   });
  // Swal.fire({
  //   title: '<strong>HTML <u>example</u></strong>',
  //   type: 'info',
  //   html:
  //     '<input type="text" class="form-control my-1"> <br/>' +
  //     '<input type="text" class="form-control my-1"> <br/>',
  //   showCloseButton: true,
  //   showCancelButton: true,
  //   focusConfirm: false,
  //   confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
  //   confirmButtonAriaLabel: 'Thumbs up, great!',
  //   cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
  //   cancelButtonAriaLabel: 'Thumbs down'
  // });
  // }
  // save(name: string) {
  //   this.doctorService.saveDoctor(name).subscribe(
  //     (response: any) => {
  //       this.loadData(this.page);
  //       /*------------------------------------------------------------------------*/
  //       /*  Se notifica que el usuario se ha gardado exitosamente.
  //       /*------------------------------------------------------------------------*/
  //       Swal.fire({
  //         title: 'Doctor guardado!',
  //         text: `El doctor ${response.name} se ha guardado exitosamente.`,
  //         type: 'success'
  //       });
  //     },
  //     (error: any) => {
  //       /*--------------------------------------------------------------------------*/
  //       /*  Se notifica al usuario que ha ocurrido un error.
  //         /*--------------------------------------------------------------------------*/
  //       Swal.fire({
  //         title: '¡Algo ha ido mal!',
  //         text: 'Ha ocurrido un error al guardar el doctor.',
  //         type: 'error'
  //       });
  //     }
  //   );
  // }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN USUARIO
  /*==================================================================================*/
  edit(doctor: DoctorModel) {
    this.doctorService.editDoctor(doctor).subscribe(
      (response: any) => {
        this.loadData(this.page);
        /*------------------------------------------------------------------------*/
        /*  Se notifica que el usuario se ha editado exitosamente.
        /*------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Doctor editado!',
          text: `El doctor ${response.name} se ha editado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al editar el doctor.',
          type: 'error'
        });
      }
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA CONTROLAR EL MODAL DE BORRAR
  /*==================================================================================*/
  modalDelete(doctor: DoctorModel) {
    /*--------------------------------------------------------------------------------*/
    /*  Se notifica que el doctor se ha borrado exitosamente.
    /*--------------------------------------------------------------------------------*/
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea borrar al doctor ${doctor.name}?`,
      type: 'question',
      showCancelButton: true
    }).then(action => {
      if (action.value) {
        this.delete(doctor._id);
      }
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BORRAR UN HOSPTAL
  /*==================================================================================*/
  delete(id: string) {
    this.doctorService.deleteDoctor(id).subscribe(
      (response: any) => {
        if (this.page + 5 >= this.total - 1) {
          this.page -= 5;
        }
        this.loadData(this.page);
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
        /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Doctor borrado!',
          text: `El doctor ${response.name} se ha borrado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*------------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
        /*------------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al borrar el doctor.',
          type: 'error'
        });
      }
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA ACTIVAR EL CAMPO DE TEXTO
  /*==================================================================================*/
  activeText(id: string) {
    this.active = id;
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA ABRIR EL MODAL DE LA IMAGEN
  /*==================================================================================*/
  open(doctor: DoctorModel) {
    const modal = this.modalService.open(ContentComponent);
    modal.componentInstance.title = `Imagen del doctor ${doctor.name}`;
    modal.componentInstance.collection = 'doctors';
    modal.componentInstance.model = doctor;
  }
}
