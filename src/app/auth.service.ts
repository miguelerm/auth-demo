import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Subject<unknown> = new Subject<unknown>();

  constructor()
  {

  }

  login(data: unknown) {
    this.user.next(data);
    console.log('login: ', data);
  }

}
