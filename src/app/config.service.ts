import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: Subject<IConfig> = new Subject<IConfig>();

  constructor(private readonly http: HttpClient) {

  }

  load()
  {
    return this.http.get('./assets/config.json')
      .pipe(tap((config) => {
        this.config.next(config as IConfig);
        console.log('config', JSON.stringify(config));
      }))
  }
}

export function configInitializer(svc: ConfigService)
{
  return () => svc.load();
}

export interface IConfig
{
  facebookAppId: string;
  facebookApiVersion: string;
}
