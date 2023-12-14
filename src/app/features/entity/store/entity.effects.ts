
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoaderService } from '@shared/services/loader.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { EntityService } from '../services/entity.service';
import * as EntityActions from './entity.actions';

@Injectable()
export class EntityEffects {

  loadEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntityActions.loadEntities),
      tap(() => {this.loaderService.show()}),
      mergeMap(() =>
        this.entityService.getEntities().pipe(
          map(entities => EntityActions.loadEntitiesSuccess({ entities })),
          catchError(error => of(EntityActions.loadEntitiesFailure({ error })))
        )
      ),
      tap(() => {
        this.loaderService.hide()
      })
    )
  );

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntityActions.addEntity),
      tap(() => {this.loaderService.show()}),
      mergeMap(action =>
        this.entityService.addEntity(action.entity).pipe(
          map(entity => EntityActions.addEntitySuccess({ entity })),
          catchError(error => of(EntityActions.addEntityFailure({ error })))
        )
      ),
      tap(() => {
        this.loaderService.hide()
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntityActions.updateEntity),
      tap(() => {this.loaderService.show()}),
      mergeMap(action =>
        this.entityService.updateEntity(action.entity).pipe(
          map(entity => EntityActions.updateEntitySuccess({ entity })),
          catchError(error => of(EntityActions.updateEntityFailure({ error })))
        )
      ),
      tap(() => {
        this.loaderService.hide()
      })
    )
  );

  deleteEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntityActions.deleteEntity),
      tap(() => {this.loaderService.show()}),
      mergeMap(action =>
        this.entityService.deleteEntity(action.id).pipe(
          map(id => EntityActions.deleteEntitySuccess({ id })),
          catchError(error => of(EntityActions.deleteEntityFailure({ error })))
        )
      ),
      tap(() => {
        this.loaderService.hide()
      })
    )
  );

  constructor(
    private actions$: Actions,
    private entityService: EntityService,
    private loaderService: LoaderService
  ) {}
}
