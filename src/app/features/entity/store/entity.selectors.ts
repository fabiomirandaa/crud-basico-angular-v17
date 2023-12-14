import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from './entity.reducer';

export const selectEntityState = createFeatureSelector<EntityState>('entity');

export const selectAllEntities = createSelector(
  selectEntityState,
  (state: EntityState) => state.entities
);

export const selectIsLoading = createSelector(
  selectEntityState,
  (state: EntityState) => state.isLoading
);

export const selectEntitiesError = createSelector(
  selectEntityState,
  (state: EntityState) => state.error
);

export const selectCurrentPage = createSelector(
  selectEntityState,
  (state: EntityState) => state.currentPage
);

export const selectPageSize = createSelector(
  selectEntityState,
  (state: EntityState) => state.pageSize
);

export const selectFilter = createSelector(
  selectEntityState,
  (state: EntityState) => state.filter
);

export const selectFilteredEntities = createSelector(
  selectAllEntities,
  selectFilter,
  (entities, filter) => {
    return entities.filter(entity => {
      const searchStr = filter.toLowerCase();
      return entity.businessName.toLowerCase().includes(searchStr) ||
             entity.tradeName.toLowerCase().includes(searchStr) ||
             entity.cnpj.toLowerCase().includes(searchStr);
    });
  }
);

export const selectTotalEntities = createSelector(
  selectAllEntities,
  (entities) => entities.length
);
