import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(): boolean {
    if (!this.userService.userLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    return this.userService.userLoggedIn();
  }
}
