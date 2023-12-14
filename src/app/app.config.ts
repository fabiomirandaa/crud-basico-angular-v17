import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { AuthInterceptor } from "@auth/interceptors/auth.interceptor";
import { EntityEffects } from "@features/entity/store/entity.effects";
import { entityReducer } from "@features/entity/store/entity.reducer";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEnvironmentNgxMask } from "ngx-mask";
import { routes } from "./app.routes";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    // TODO: converter para funcional interceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideStore({ entity: entityReducer }),
    provideEffects([EntityEffects]),
    provideStoreDevtools({
      maxAge: 25
    }),
    provideEnvironmentNgxMask(),
  ]
};
