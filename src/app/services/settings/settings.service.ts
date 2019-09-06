import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(@Inject(DOCUMENT) private document) {}

  saveConfig(name: string, theme: any) {
    this.setTheme(theme);
    localStorage.setItem(name, JSON.stringify(theme));
  }

  readConfig(name: string) {
    const theme = JSON.parse(localStorage.getItem(name));
    return theme ? theme : 'default';
  }

  setTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
  }
}
