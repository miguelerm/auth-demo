import { AuthService } from "./auth.service";
import { ConfigService } from "./config.service";

export function facebookInitializer(configService: ConfigService, auth: AuthService) {
    return () => new Promise(resolve => {
        configService.config.subscribe(config => {

            window.fbAsyncInit = () => {
                FB.init({
                    appId      : config.facebookAppId,
                    cookie     : true,
                    xfbml      : true,
                    version    : config.facebookApiVersion,
                });

                FB.AppEvents.logPageView();
                resolve(void 0);
            };

            window.fbOnLogin = () => {

                FB.getLoginStatus(statusResponse => {

                    if (statusResponse.status == 'connected') {
                        FB.api('/me', (response) => {
                            auth.login(response);
                        });
                    }
                });
            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s) as HTMLScriptElement; js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode?.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    });
}
