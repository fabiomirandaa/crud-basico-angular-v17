import { createAction, props } from '@ngrx/store';
import { Entity } from '../models/entity.interface';

export const loadEntities = createAction('[Entity] Load Entities');
export const loadEntitiesSuccess = createAction(
  '[Entity] Load Entities Success',
  props<{ entities: Entity[] }>()
);
export const loadEntitiesFailure = createAction(
  '[Entity] Load Entities Failure',
  props<{ error: any }>()
);

export const addEntity = createAction(
  '[Entity] Add Entity',
  props<{ entity: Entity }>()
);
export const addEntitySuccess = createAction(
  '[Entity] Add Entity Success',
  props<{ entity: Entity }>()
);
export const addEntityFailure = createAction(
  '[Entity] Add Entity Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Entity] Update Entity',
  props<{ entity: Entity }>()
);
export const updateEntitySuccess = createAction(
  '[Entity] Update Entity Success',
  props<{ entity: Entity }>()
);
export const updateEntityFailure = createAction(
  '[Entity] Update Entity Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Entity] Delete Entity',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Entity] Delete Entity Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Entity] Delete Entity Failure',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Entity] Set Page',
  props<{ page: number }>()
);

export const setPageSize = createAction(
  '[Entity] Set Page Size',
  props<{ size: number }>()
);

export const setFilter = createAction(
  '[Entity] Set Filter',
  props<{ filter: string }>()
);
