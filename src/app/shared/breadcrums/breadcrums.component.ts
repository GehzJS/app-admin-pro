import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {
  name: string;
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getRouteData().subscribe((data: any) => {
      this.name = data.title;
      this.setPageInfo(data.title);
    });
  }

  ngOnInit() {}

  getRouteData() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd), // Se filtra el tipo de evento
      filter((event: ActivationEnd) => event.snapshot.firstChild === null), // Se elijen sólo los arreglos con data.
      map((event: ActivationEnd) => event.snapshot.data) // Se retorna solo la información necesaria.
    );
  }

  setPageInfo(data: string) {
    const metaTag: MetaDefinition = {
      name: 'description',
      content: data
    };
    this.title.setTitle(data);
    this.meta.updateTag(metaTag);
  }
}
