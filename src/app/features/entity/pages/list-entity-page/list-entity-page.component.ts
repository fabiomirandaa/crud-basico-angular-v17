
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityEditComponent } from '@features/entity/components/entity-edit/entity-edit.component';
import { EntityReadComponent } from '@features/entity/components/entity-read/entity-read.component';
import { Entity } from '@features/entity/models/entity.interface';
import { RegionLabelPipe } from '@features/entity/pipes/region-label.pipe';
import { SpecialtyLabelPipe } from '@features/entity/pipes/specialty-label.pipe';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import * as EntityActions from '../../store/entity.actions';
import * as EntitySelectors from '../../store/entity.selectors';




@Component({
  selector: 'app-list-entity-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    RegionLabelPipe,
    SpecialtyLabelPipe,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './list-entity-page.component.html',
  styleUrl: './list-entity-page.component.scss'
})
export class ListEntityPageComponent implements OnInit {
  displayedColumns: string[] = ['tradeName', 'region', 'medicalSpecialties', 'isActive', 'actions'];
  searchControl = new FormControl('');
  entities$ = this.store.select(EntitySelectors.selectFilteredEntities).pipe(startWith([]));
  totalEntities$ = this.store.select(EntitySelectors.selectTotalEntities).pipe(startWith(0));
  currentPage$ = this.store.select(EntitySelectors.selectCurrentPage).pipe(startWith(0));
  pageSize$ = this.store.select(EntitySelectors.selectPageSize).pipe(startWith(0));
  filter$ = this.store.select(EntitySelectors.selectFilter);
  regions = [
    { value: '25053d40-c15d-4a02-9908-8a09a0e0eaba', label: 'Alto tietê' },
    { value: '704f8a68-5253-411a-be22-e16e5a70335a', label: 'Interior' },
    { value: 'b6b7a1ab-460c-4ed0-a971-72dd427d71d1', label: 'ES' },
    { value: '72726447-68c2-4d79-88d6-0db3044abb80', label: 'SP Interior' },
    { value: '2e9625b6-d413-4cc0-af0b-07f349bc6bf2', label: 'SP' },
    { value: '6429212b-c0fd-4e1b-99fb-2a45480c2c1a', label: 'SP2' },
    { value: '1f95235e-a36e-4a5b-ab04-9a5cdbf8a207', label: 'MG' },
    { value: '336581f6-843f-4dc6-9122-d355a929cebc', label: 'Nacional' },
    { value: 'e6c1a0ab-8f30-4767-b54f-822daf759e37', label: 'SP CAV' },
    { value: 'f2b75e0b-f7d4-44bf-9897-830826bba000', label: 'RJ' },
    { value: '3a829c76-2c45-42b8-9c32-71e30d27fef7', label: 'SP1' },
    { value: '0765b03a-ac6f-487a-a0b8-6b99ca36636d', label: 'NE1' },
    { value: '8ea71f06-5c74-49bd-87b2-4ce2c60493c5', label: 'NE2' },
    { value: '2b8a070d-c6d8-42fe-9679-cb31850ffff8', label: 'SUL' },
    { value: 'be04733a-bcae-4e3c-862d-40739cfaf507', label: 'Norte' },
  ];

  medicalSpecialties = [
    { value: 'f2332a24-17d0-44da-9e29-ef32667a9900', label: 'Cardiologia' },
    { value: 'f88e60fb-1b51-4231-af59-7e68bdd46da6', label: 'Dermatologia' },
    { value: '8b450a38-cd63-4ec0-b927-b75614d26858', label: 'Pediatria' },
    { value: '58c5fae9-b4d6-49eb-912e-88edb0640ead', label: 'Neurologia' },
    { value: '1eb02f11-4fa4-4d86-a4d2-f9c44e38e428', label: 'Ortopedia' },
    { value: 'b1c0159d-3f23-4c81-8ccc-c2a9e266c85d', label: 'Oftalmologia' },
    { value: '88fdf808-9400-4c1e-a342-f310337a3a09', label: 'Gastroenterologia' }
  ];


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    const searchQuery = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (searchQuery) {
      this.searchControl.setValue(searchQuery);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(EntityActions.loadEntities());
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(query => {
      this.store.dispatch(EntityActions.setFilter({ filter: query as string }));
      this.updateQueryParams({ search: query as string });
    });

  }

  private updateQueryParams(params: { search: string }): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(EntityActions.setFilter({ filter: filterValue }));
  }

  onPageChange(event: PageEvent): void {
    this.store.dispatch(EntityActions.setPage({ page: event.pageIndex + 1 }));
    this.store.dispatch(EntityActions.setPageSize({ size: event.pageSize }));
  }

  openAddEntityModal(): void {
    this.dialog.open(EntityEditComponent, {
      width: '600px',
      data: { entity: null }
    });

  }

  openEditEntityModal(entity: Entity): void {
    this.dialog.open(EntityEditComponent, {
      width: '600px',
      data: { entity }
    });
  }

  openViewEntityModal(entity: Entity) {
    this.dialog.open(EntityReadComponent, {
      width: '600px',
      data: { entity }
    });
  }

  delete(entity: Entity): void {
    this.store.dispatch(EntityActions.deleteEntity({ id: entity.id }));
  }

}
