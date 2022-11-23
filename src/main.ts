import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootloader(main: any) {
  if (document.readyState === 'complete') {
    main()
  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
}

function main (){
  return platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
};

bootloader(main);
