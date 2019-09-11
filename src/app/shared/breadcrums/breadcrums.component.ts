/*====================================================================================*/
/*  IMPORTACIONES DE ANGULAR
/*====================================================================================*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';
/*====================================================================================*/
/*  IMPORTACIONES DE RXJS
/*====================================================================================*/
import { filter, map } from 'rxjs/operators';
/*====================================================================================*/
/*  CONFIGURACIONES DEL COMPONENTE
/*====================================================================================*/
@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
/*====================================================================================*/
/*  INICIO DEL COMPONENTE
/*====================================================================================*/
export class BreadcrumsComponent implements OnInit {
  /*==================================================================================*/
  /*  DEFINICIÓN DE ATRIBUTOS
  /*==================================================================================*/
  /*----------------------------------------------------------------------------------*/
  /*  Título de la página.
  /*----------------------------------------------------------------------------------*/
  name: string;
  /*==================================================================================*/
  /*  CONSTRUCTOR
  /*==================================================================================*/
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    /*--------------------------------------------------------------------------------*/
    /*  Se obtienen los datos de la ruta.
    /*--------------------------------------------------------------------------------*/
    this.getRouteData().subscribe((data: any) => {
      this.name = data.title;
      this.setPageInfo(data.title);
    });
  }
  /*==================================================================================*/
  /*  FUNCIÓN DE INICIO
  /*==================================================================================*/
  ngOnInit() {}
  /*==================================================================================*/
  /*  FUNCIÓN PARA OBTENER LOS DATOS DE LA RUTA
  /*==================================================================================*/
  getRouteData() {
    /*--------------------------------------------------------------------------------*/
    /*  Se obtienen los datos de la ruta.
    /*--------------------------------------------------------------------------------*/
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd), // Se filtra el tipo de evento
      filter((event: ActivationEnd) => event.snapshot.firstChild === null), // Se elijen sólo los arreglos con data.
      map((event: ActivationEnd) => event.snapshot.data) // Se retorna solo la información necesaria.
    );
  }
  /*==================================================================================*/
  /*  FUNCIÓN PARA ASIGNAR LOS DATOS OBTENIDOS DE LA RUTA
  /*==================================================================================*/
  setPageInfo(data: string) {
    /*--------------------------------------------------------------------------------*/
    /*  Se crea la estructura de una etiqueta meta de HTML.
    /*--------------------------------------------------------------------------------*/
    const metaTag: MetaDefinition = {
      name: 'description',
      content: data
    };
    /*--------------------------------------------------------------------------------*/
    /*  Se asignan los valores correspondientes a la etiqueta.
    /*--------------------------------------------------------------------------------*/
    this.title.setTitle(data);
    this.meta.updateTag(metaTag);
  }
}
