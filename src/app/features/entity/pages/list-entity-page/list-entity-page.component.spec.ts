import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListEntityPageComponent } from './list-entity-page.component';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store, StoreModule } from '@ngrx/store';
import { entityReducer } from '../../store/entity.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListEntityPageComponent', () => {
  let component: ListEntityPageComponent;
  let fixture: ComponentFixture<ListEntityPageComponent>;
  let store: Store;
  let dialog: MatDialog;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        StoreModule.forRoot({ entity: entityReducer }),
        RouterTestingModule,
        ListEntityPageComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: { get: () => 'test-query' } } }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEntityPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions for pagination', fakeAsync(() => {
    spyOn(store, 'dispatch');
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    component.onPageChange(pageEvent);
    tick();
    expect(store.dispatch).toHaveBeenCalled();
  }));

  it('should dispatch action for filter change', fakeAsync(() => {
    spyOn(store, 'dispatch');
    const event = new Event('input');
    Object.defineProperty(event, 'target', { writable: false, value: { value: 'test' } });
    component.applyFilter(event);
    tick();
    expect(store.dispatch).toHaveBeenCalled();
  }));

  // it('should open the add entity modal', () => {
  //   component.openAddEntityModal();
  //   expect(dialog.open).toHaveBeenCalled();
  // });

});
