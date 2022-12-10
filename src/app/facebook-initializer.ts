import { ConfigService } from "./config.service";

export function facebookInitializer(configService: ConfigService) {
    return () => configService.config.subscribe(config => {
        console.log('fb', JSON.stringify(config));
        window.fbAsyncInit = function() {
            FB.init({
                appId      : config.facebookAppId,
                cookie     : true,
                xfbml      : true,
                version    : config.facebookApiVersion
            });

            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s) as HTMLScriptElement; js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}
