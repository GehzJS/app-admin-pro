/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { HospitalService } from 'src/app/services/hospital/hospital.service';
/*====================================================================================*/
/*  IMPORTACIONES DE MODELOS
/*====================================================================================*/
import { HospitalModel } from 'src/app/models/hospital.model';
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
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL SERVICIO
/*====================================================================================*/
export class HospitalsComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Variables de hospitales.
  /*----------------------------------------------------------------------------------*/
  hospitals: HospitalModel[];
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
    private hospitalService: HospitalService
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
  /*  FUNCIÓN PARA GARGAR LOS HOSPITALES
  /*==================================================================================*/
  loadData(page: number) {
    this.charging = true;
    this.page += page;
    /*--------------------------------------------------------------------------------*/
    /* Se verifica que la paginación sea válida y se realiza la petición.
    /*--------------------------------------------------------------------------------*/
    if (this.page >= 0 || this.page <= this.total) {
      this.hospitalService
        .getHospitals(this.page)
        .subscribe((response: any) => {
          this.charging = false;
          this.hospitals = response.hospitals;
          this.total = response.total;
        });
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BUSCAR HOSPITALES
  /*==================================================================================*/
  searchHospital(keyword: string) {
    if (keyword !== '') {
      this.hospitalService
        .searchHospitals(keyword)
        .subscribe((response: HospitalModel[]) => (this.hospitals = response));
    } else {
      this.loadData(0);
    }
  }
  modalSave() {
    Swal.fire({
      title: 'Agregar un nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del hospital.',
      type: 'info'
    }).then(name => {
      if (name.value) {
        this.save(name.value);
      }
    });
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
  }
  save(name: string) {
    this.hospitalService.saveHospital(name).subscribe(
      (response: any) => {
        this.loadData(this.page);
        /*------------------------------------------------------------------------*/
        /*  Se notifica que el usuario se ha gardado exitosamente.
        /*------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Hospital guardado!',
          text: `El hospital ${response.name} se ha guardado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al guardar el hospital.',
          type: 'error'
        });
      }
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN USUARIO
  /*==================================================================================*/
  edit(hospital: HospitalModel) {
    this.hospitalService.editHospital(hospital).subscribe(
      (response: any) => {
        this.loadData(this.page);
        /*------------------------------------------------------------------------*/
        /*  Se notifica que el usuario se ha editado exitosamente.
        /*------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Hospital editado!',
          text: `El hospital ${response.name} se ha editado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al editar el hospital.',
          type: 'error'
        });
      }
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA CONTROLAR EL MODAL DE BORRAR
  /*==================================================================================*/
  modalDelete(hospital: HospitalModel) {
    /*--------------------------------------------------------------------------------*/
    /*  Se notifica que el hospital se ha borrado exitosamente.
    /*--------------------------------------------------------------------------------*/
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea borrar al hospital ${hospital.name}?`,
      type: 'question',
      showCancelButton: true
    }).then(action => {
      if (action.value) {
        this.delete(hospital._id);
      }
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA BORRAR UN HOSPTAL
  /*==================================================================================*/
  delete(id: string) {
    this.hospitalService.deleteHospital(id).subscribe(
      (response: any) => {
        if (this.page + 5 >= this.total - 1) {
          this.page -= 5;
        }
        this.loadData(this.page);
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
        /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Hospital borrado!',
          text: `El hospital ${response.name} se ha borrado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*------------------------------------------------------------------------------*/
        /*  Se notifica al usuario que ha ocurrido un error.
        /*------------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al borrar el hospital.',
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
  open(hospital: HospitalModel) {
    const modal = this.modalService.open(ContentComponent);
    modal.componentInstance.title = `Imagen del hospital ${hospital.name}`;
    modal.componentInstance.collection = 'hospitals';
    modal.componentInstance.model = hospital;
  }
}
