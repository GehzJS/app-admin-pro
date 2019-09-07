import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  colors: any = [
    'default',
    'green',
    'red',
    'blue',
    'purple',
    'megna',
    'default-dark',
    'green-dark',
    'red-dark',
    'blue-dark',
    'purple-dark',
    'megna-dark'
  ];
  selected: string;

  constructor(private service: SettingsService) {}

  ngOnInit() {
    this.selected = this.service.readConfig('theme');
  }

  changeTheme(theme: string) {
    this.service.saveConfig('theme', theme);
    this.selected = theme;
  }

  setClass(theme: string) {
    return theme.concat('-theme');
  }
}
