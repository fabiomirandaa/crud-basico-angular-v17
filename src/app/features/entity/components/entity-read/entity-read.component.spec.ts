// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { EntityReadComponent } from './entity-read.component';
// import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { provideNgxMask } from 'ngx-mask';
// import { Entity } from '../../models/entity.interface';
// import { EntityEditComponent } from '../entity-edit/entity-edit.component';
// import { of } from 'rxjs';
// import { StoreModule } from '@ngrx/store';
// import { entityReducer } from '../../store/entity.reducer';

// describe('EntityReadComponent', () => {
//   let component: EntityReadComponent;
//   let fixture: ComponentFixture<EntityReadComponent>;
//   let dialogMock: any;
//   let dialogRefMock: any;

//   beforeEach(async () => {
//     dialogMock = {
//       open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of({}) })
//     };
//     dialogRefMock = {
//       close: jasmine.createSpy('close')
//     };

//     await TestBed.configureTestingModule({
//       imports: [
//         MatButtonModule,
//         MatDialogModule,
//         EntityReadComponent,
//         StoreModule.forRoot({ entity: entityReducer }),
//       ],
//       providers: [
//         { provide: MatDialog, useValue: dialogMock },
//         { provide: MatDialogRef, useValue: dialogRefMock },
//         {
//           provide: MAT_DIALOG_DATA, useValue: {
//             entity: {
//               "id": 1,
//               "businessName": "E Corppe",
//               "tradeName": "E-Corpe",
//               "cnpj": "12.345.678/0001-90",
//               "region": "f2b75e0b-f7d4-44bf-9897-830826bba000",
//               "medicalSpecialties": [
//                 "f2332a24-17d0-44da-9e29-ef32667a9900",
//                 "f88e60fb-1b51-4231-af59-7e68bdd46da6"
//               ],
//               "inaugurationDate": "2020-01-01T00:00:00.000Z",
//               "isActive": true
//             },
//           }
//         },
//         provideNgxMask()
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();

//     fixture = TestBed.createComponent(EntityReadComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should close the dialog when onClose is called', () => {
//     component.onClose();
//     expect(dialogRefMock.close).toHaveBeenCalled();
//   });

//   it('should open the edit modal when onEdit is called', () => {
//     component.onEdit();
//     expect(dialogMock.open).toHaveBeenCalledWith(EntityEditComponent, {
//       width: '600px',
//       data: { entity: component.entity }
//     });

//     expect(dialogRefMock.close).toHaveBeenCalled();
//   });
// });
