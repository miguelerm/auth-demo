import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public title = 'auth-demo';
  public user: any;

  @ViewChildren('loginGoogleButton')
  private loginGbtn!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(auth: AuthService, changes: ChangeDetectorRef)
  {
    auth.user.subscribe(user => {
      this.user = user;
      console.log(user);
      changes.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    console.log('x: ', this.loginGbtn.first.nativeElement);
    google.accounts.id.renderButton(this.loginGbtn.first.nativeElement, { type: 'standard', theme: 'outline', size: 'medium'});
  }

}
