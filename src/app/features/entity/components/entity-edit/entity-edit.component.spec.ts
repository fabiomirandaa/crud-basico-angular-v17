// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { EntityEditComponent } from './entity-edit.component';
// import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Store, StoreModule } from '@ngrx/store';
// import { entityReducer } from '../../store/entity.reducer';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { cnpjValidator } from '../../../../shared/validators/cnpj.validator';
// import { of } from 'rxjs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('EntityEditComponent', () => {
//   let component: EntityEditComponent;
//   let fixture: ComponentFixture<EntityEditComponent>;
//   let store: Store;
//   let dialogRefMock: any;

//   beforeEach(async () => {
//     dialogRefMock = {
//       close: jasmine.createSpy('close')
//     };

//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         StoreModule.forRoot({ entity: entityReducer }),
//         EntityEditComponent,
//         BrowserAnimationsModule,
//       ],
//       providers: [
//         FormBuilder,
//         { provide: MatDialogRef, useValue: dialogRefMock },
//         { provide: MAT_DIALOG_DATA, useValue: { entity: { id: '1', businessName: 'Test Company', tradeName: 'TC', cnpj: '12345678901234' } } }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();

//     fixture = TestBed.createComponent(EntityEditComponent);
//     component = fixture.componentInstance;
//     store = TestBed.inject(Store);
//     spyOn(store, 'select').and.returnValue(of(false)); // Mock para select do NgRx store
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the entity form with provided data', () => {
//     expect(component.entityForm).toBeDefined();
//     expect(component.entityForm.get('businessName')?.value).toEqual('Test Company');
//     expect(component.entityForm.get('tradeName')?.value).toEqual('TC');
//     expect(component.entityForm.get('cnpj')?.value).toEqual('12345678901234');
//   });

//   it('should not submit invalid form', () => {
//     component.entityForm.controls['businessName'].setValue('');
//     component.onSubmit();
//     expect(dialogRefMock.close).not.toHaveBeenCalled();
//   });

//   it('should submit valid form and close dialog', () => {
//     spyOn(store, 'dispatch');
//     component.entityForm.controls['businessName'].setValue('Updated Company');
//     component.onSubmit();
//     expect(store.dispatch).toHaveBeenCalled();
//     expect(dialogRefMock.close).toHaveBeenCalled();
//   });

//   it('should validate CNPJ using the custom validator', () => {
//     component.entityForm.controls['cnpj'].setValue('invalid-cnpj');
//     expect(component.entityForm.valid).toBeFalsy();
//     component.entityForm.controls['cnpj'].setValue('12345678901234'); // Assume a valid CNPJ
//     expect(component.entityForm.valid).toBeTruthy();
//   });

//   it('should close the dialog when onCancel is called', () => {
//     component.onCancel();
//     expect(dialogRefMock.close).toHaveBeenCalled();
//   });

//   it('should dispatch delete action when onDelete is called', () => {
//     spyOn(store, 'dispatch');
//     component.onDelete();
//     expect(store.dispatch).toHaveBeenCalled();
//     expect(dialogRefMock.close).toHaveBeenCalled();
//   });
// });
