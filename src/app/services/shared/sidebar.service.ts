import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      items: [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Graphics', link: '/graphics' },
        { title: 'Progress', link: '/progress' }
      ]
    }
  ];

  constructor() {}
}
