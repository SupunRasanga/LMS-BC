import { Routes } from '@angular/router';
import { AuthUserGuard } from '../../guards/auth-user.guard';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AvailabilityComponent } from 'src/app/pages/availability/availability.component';
import { IssueBookComponent } from 'src/app/pages/issue-book/issue-book.component';
import { ReturnBookComponent } from 'src/app/pages/return-book/return-book.component';
import { BooksComponent } from 'src/app/pages/books/books.component';
import { MembersComponent } from 'src/app/pages/members/members.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,canActivate : [AuthUserGuard] },
    { path: 'user-profile',   component: UserProfileComponent,canActivate : [AuthUserGuard] },
    { path: 'tables',         component: TablesComponent ,canActivate : [AuthUserGuard] },
    { path: 'icons',          component: IconsComponent , canActivate : [AuthUserGuard] },
    { path: 'maps',           component: MapsComponent , canActivate : [AuthUserGuard] },
    { path: 'availability',   component: AvailabilityComponent, canActivate : [AuthUserGuard] },
    { path: 'issue',          component: IssueBookComponent, canActivate : [AuthUserGuard] },
    { path: 'return',         component: ReturnBookComponent, canActivate: [AuthUserGuard]},
    { path: 'books',          component: BooksComponent, canActivate: [AuthUserGuard]},
    { path: 'members',        component: MembersComponent, canActivate: [AuthUserGuard]},
];
