import { Action, createReducer, on } from '@ngrx/store';
import { Entity } from '../models/entity.interface';
import * as EntityActions from './entity.actions';

export interface EntityState {
  entities: Entity[];
  error: string | null;
  isLoading: boolean;
  currentPage: number;
  pageSize: number;
  filter: string;
}

export const initialState: EntityState = {
  entities: [],
  error: null,
  isLoading: false,
  currentPage: 0,
  pageSize: 10,
  filter: '',
};

export const entityReducer = createReducer(
  initialState,
  on(EntityActions.loadEntities, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(EntityActions.loadEntitiesSuccess, (state, { entities }) => ({
    ...state,
    entities: entities,
    isLoading: false
  })),
  on(EntityActions.loadEntitiesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(EntityActions.addEntity, state => ({
    ...state,
    isLoading: true
  })),
  on(EntityActions.addEntitySuccess, (state, { entity }) => ({
    ...state,
    entities: [...state.entities, entity],
    isLoading: false
  })),
  on(EntityActions.addEntityFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(EntityActions.updateEntity, state => ({
    ...state,
    isLoading: true
  })),
  on(EntityActions.updateEntitySuccess, (state, { entity }) => ({
    ...state,
    entities: state.entities.map(e => e.id === entity.id ? entity : e),
    isLoading: false
  })),
  on(EntityActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(EntityActions.deleteEntity, state => ({
    ...state,
    isLoading: true
  })),
  on(EntityActions.deleteEntitySuccess, (state, { id }) => ({
    ...state,
    entities: state.entities.filter(e => e.id !== id),
    isLoading: false
  })),
  on(EntityActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(EntityActions.setPage, (state, { page }) => ({
    ...state,
    currentPage: page
  })),
  on(EntityActions.setPageSize, (state, { size }) => ({
    ...state,
    pageSize: size
  })),
  on(EntityActions.setFilter, (state, { filter }) => ({
    ...state,
    filter: filter
  })),
);

export function reducer(state: EntityState | undefined, action: Action) {
  return entityReducer(state, action);
}

