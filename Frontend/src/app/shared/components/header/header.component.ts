import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../pages/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = false;
  islogged = false; 


  private suscripcion: Subscription = new Subscription;

  @Output() toggleSidenav= new EventEmitter<void>();

  constructor(private authSvc: AuthService) { }
  
  ngOnInit(): void {
    this.suscripcion.add(
      this.authSvc.islogged.subscribe((res)=>(this.islogged = res))
    );
    
  }
  
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


  onToggleSidenav(): void{
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
  }

}
