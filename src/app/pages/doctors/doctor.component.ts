/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/*====================================================================================*/
/*  IMPORTACIONES DE SERVICIOS
/*====================================================================================*/
import { DoctorService } from 'src/app/services/doctor/doctor.service';
/*====================================================================================*/
/*  IMPORTACIONES DE MODELOS
/*====================================================================================*/
import { DoctorModel } from 'src/app/models/doctor.model';
/*====================================================================================*/
/*  IMPORTACIONES DE LIBERÍAS DE TERCEROS
/*====================================================================================*/
import Swal from 'sweetalert2';
import { HospitalModel } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class DoctorComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Control del formulario.
  /*----------------------------------------------------------------------------------*/
  form: FormGroup;
  /*----------------------------------------------------------------------------------*/
  /*  Variable del doctor.
  /*----------------------------------------------------------------------------------*/
  doctor: DoctorModel;
  hospital: HospitalModel | string;
  hospitals: HospitalModel[];
  /*----------------------------------------------------------------------------------*/
  /*  Variables de la imagen.
  /*----------------------------------------------------------------------------------*/
  image: File;
  temporal: any;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private hospitalService: HospitalService
  ) {}
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    /*--------------------------------------------------------------------------------*/
    /*  Creación del formulario.
    /*--------------------------------------------------------------------------------*/
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      hospital: new FormControl(null, Validators.required)
    });
    /*--------------------------------------------------------------------------------*/
    /*  Asignación de datos por defecto.
    /*--------------------------------------------------------------------------------*/
    if (id !== 'new') {
      this.doctorService.getDoctor(id).subscribe((response: DoctorModel) => {
        this.doctor = response;
        this.form.controls.name.setValue(response.name);
        // this.form.controls.hospital.setValue(response.hospital.name);
        this.hospital = response.hospital;
      });
    }
    this.hospitalService.getHospitals().subscribe((response: any) => {
      this.hospitals = response.hospitals;
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN QUE ELIGE SI GUARDA O EDITA UN DOCTOR
  /*==================================================================================*/
  choose() {
    this.doctor ? this.edit() : this.save();
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA GUARDAR UN DOCTOR
  /*==================================================================================*/
  save() {
    if (this.form.valid) {
      this.doctorService
        .saveDoctor(
          this.form.controls.name.value,
          this.form.controls.hospital.value
        )
        .subscribe(
          (response: any) => {
            /*------------------------------------------------------------------------*/
            /*  Se notifica que el doctor se ha guardado exitosamente.
          /*------------------------------------------------------------------------*/
            Swal.fire({
              title: '¡doctor editado!',
              text: `El doctor ${response.name} se ha guardado exitosamente.`,
              type: 'success',
              onClose: () => {
                this.router.navigate(['/doctor', response._id]);
              }
            });
          },
          (error: any) => {
            /*--------------------------------------------------------------------------*/
            /*  Se notifica al doctor que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
            Swal.fire({
              title: '¡Algo ha ido mal!',
              text: 'Ha ocurrido un error al guardar el doctor.',
              type: 'error'
            });
          }
        );
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA EDITAR UN DOCTOR
  /*==================================================================================*/
  edit() {
    if (this.form.valid) {
      /*------------------------------------------------------------------------------*/
      /*  Se genera un doctor válido y se realiza la petición.
      /*------------------------------------------------------------------------------*/
      const user = JSON.parse(localStorage.getItem('user'));
      const newDoctor = new DoctorModel(
        this.form.controls.name.value,
        this.doctor.image,
        this.form.controls.hospital.value,
        user._id,
        this.doctor._id
      );
      this.doctorService.editDoctor(newDoctor).subscribe(
        (response: any) => {
          /*------------------------------------------------------------------------*/
          /*  Se notifica que el doctor se ha editado exitosamente.
          /*------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡doctor editado!',
            text: `El doctor ${response.name} se ha editado exitosamente.`,
            type: 'success'
          });
        },
        (error: any) => {
          /*--------------------------------------------------------------------------*/
          /*  Se notifica al doctor que ha ocurrido un error.
          /*--------------------------------------------------------------------------*/
          Swal.fire({
            title: '¡Algo ha ido mal!',
            text: 'Ha ocurrido un error al editar el doctor.',
            type: 'error'
          });
        }
      );
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN CONTROLAR LA IMAGEN
  /*==================================================================================*/
  charged(image: File) {
    if (image) {
      if (image.type.indexOf('image') >= 0) {
        /*----------------------------------------------------------------------------*/
        /*  Se genera la vista previa de la imagen.
        /*----------------------------------------------------------------------------*/
        this.image = image;
        const reader = new FileReader();
        const temporalUrl = reader.readAsDataURL(image);
        reader.onloadend = () => (this.temporal = reader.result);
      } else {
        this.image = undefined;
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al doctor que ha ocurrido un error.
        /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Un momento!',
          text: 'El archivo seleccionado no es una imagen.',
          type: 'warning'
        });
      }
    }
  }
  /*==================================================================================*/
  /*  FUNCIÓN EDITAR LA IMAGEN
  /*==================================================================================*/
  editImage() {
    this.doctorService.editImage(this.doctor._id, this.image).subscribe(
      (response: any) => {
        /*------------------------------------------------------------------------*/
        /*  Se notifica que el doctor se ha editado exitosamente.
        /*------------------------------------------------------------------------*/
        Swal.fire({
          title: 'Imagen editada!',
          text: `La imagen del doctor ${response.name} se ha editado exitosamente.`,
          type: 'success'
        });
      },
      (error: any) => {
        /*--------------------------------------------------------------------------*/
        /*  Se notifica al doctor que ha ocurrido un error.
        /*--------------------------------------------------------------------------*/
        Swal.fire({
          title: '¡Algo ha ido mal!',
          text: 'Ha ocurrido un error al editar la imagen.',
          type: 'error'
        });
      }
    );
  }
  changed(id: string) {
    this.hospitalService
      .getHospital(id)
      .subscribe((response: HospitalModel) => {
        this.hospital = response;
      });
  }
}
