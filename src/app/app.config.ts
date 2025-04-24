import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection
} from '@angular/core';
import {
  createUrlTreeFromSnapshot, PreloadAllModules,
  provideRouter,
  Router, withComponentInputBinding,
  withInMemoryScrolling, withPreloading, withRouterConfig,
  withViewTransitions
} from '@angular/router';

import {appRoutes} from './app.routes';
import {HAMMER_GESTURE_CONFIG, provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch,} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideCloudinaryLoader} from '@angular/common';
import {SwipeBottomTabHammer} from './core/providers/swipe-bottom-tab-hammer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideClientHydration(withEventReplay()),
    provideRouter(
      appRoutes,
      withInMemoryScrolling(),
      withViewTransitions({
        onViewTransitionCreated: ({transition, to}) => {
          const router = inject(Router);
          const toTree = createUrlTreeFromSnapshot(to, []);
          // Skip the transition if the only thing changing is the fragment and queryParams
          if (
            router.isActive(toTree, {
              paths: 'exact',
              matrixParams: 'exact',
              fragment: 'ignored',
              queryParams: 'ignored',
            })
          ) {
            transition.skipTransition();
          }
        },
      }),
      withComponentInputBinding(),
      withRouterConfig({paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload'}),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(
      withFetch(),
      //  withInterceptors([authenticationInterceptor, cachingInterceptor]),
    ),
    provideAnimationsAsync(),
    provideCloudinaryLoader('https://res.cloudinary.com/ismaestro/'),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: SwipeBottomTabHammer,
    }
  ]
};
