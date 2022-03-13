// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'hacker-news-55864',
    appId: '1:930824686568:web:34734dd67f08452519725d',
    storageBucket: 'hacker-news-55864.appspot.com',
    apiKey: 'AIzaSyAYAnnApJopzpOeIpQHadGo1Nhx1hWB_pI',
    authDomain: 'hacker-news-55864.firebaseapp.com',
    messagingSenderId: '930824686568',
  },
  production: false,
  hackerNewsUrl: 'https://hacker-news.firebaseio.com/v0/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
