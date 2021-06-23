import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;
  islogged = false; 

  @Output() toggleSidenav= new EventEmitter<void>();

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.islogged.subscribe((res)=>(this.islogged = res));
  }

  onToggleSidenav(): void{
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
  }

}
