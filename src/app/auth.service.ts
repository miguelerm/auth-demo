import { Injectable } from '@angular/core';
import { concatMap, EMPTY, from, map, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login() {
    return from(new Promise<fb.StatusResponse>(resolve => FB.login(resolve, {scope: 'public_profile,email'})))
      .pipe(concatMap(({ authResponse }) => {
        if (!authResponse) return EMPTY;
        return of(authResponse.accessToken);
      }))
      .pipe(concatMap(accessToken => this.getUserInfo(accessToken)));
  }

  getUserInfo(accessToken: string)
  {
    return this.http.get<IUserInfo>(`https://graph.facebook.com/v8.0/me?access_token=${accessToken}`)
      .pipe(map(userInfo => ({ accessToken, userInfo} as ILoginResponse)));
  }
}

export interface ILoginResponse
{
  accessToken: string
  userInfo: IUserInfo
}

export interface IUserInfo
{
  id:string
  name:string
}
