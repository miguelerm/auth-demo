import { AuthService } from "./auth.service";
import { ConfigService } from "./config.service";
import { parseJwt } from "./jwt-parser";

export function googleInitializer(configService: ConfigService, auth: AuthService) {
    return () => new Promise(resolve => {
        configService.config.subscribe(config => {
            window.onGoogleLibraryLoad = () => {
                google.accounts.id.initialize({
                    client_id: config.googleClientId,
                    callback: (r) => auth.login(parseJwt(r.credential))
                });

                resolve(void 0);
            }

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s) as HTMLScriptElement;
                js.id = id;
                js.src = "https://accounts.google.com/gsi/client";
                js.async = true;
                js.defer = true;
                fjs?.parentNode?.insertBefore(js, fjs);
              }(document, 'script', 'google-gsi'));
        });
    })
}
