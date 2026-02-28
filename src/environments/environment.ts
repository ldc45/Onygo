// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// IMPORTANT : Ne jamais committer vos clés API réelles ici.
// Créez un fichier environment.local.ts (ignoré par git) avec vos vraies clés.
export const environment = {
  production: false,
  exchangeRateApiKey: 'VOTRE_CLE_EXCHANGERATE_API',
  openWeatherApiKey: 'VOTRE_CLE_OPENWEATHER_API',
  unsplashApiKey: 'VOTRE_CLE_UNSPLASH_API'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
