import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/availability', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/availability', title: 'Check Availability',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/issue', title: 'Issue Book',  icon:'ni-planet text-blue', class: '' },
    { path: '/return', title: 'Return Book',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/books', title: 'Books',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Members',  icon:'ni-key-25 text-info', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/register', title: 'Logout',  icon:'ni-circle-08 text-pink', class: '' }



    // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/dashboard', title: 'Books',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

  }

  logout(){
    this.auth.logout();
  }


}
