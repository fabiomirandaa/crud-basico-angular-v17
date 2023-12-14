import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Entity } from '../../models/entity.interface';
import * as EntityActions from '../../store/entity.actions';
import * as EntitySelectors from '../../store/entity.selectors';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { cnpjValidator } from '../../../../shared/validators/cnpj.validator';

@Component({
  selector: 'app-entity-edit',
  standalone: true,
  imports: [
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatNativeDateModule,
    NgxMaskDirective
],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNgxMask()
  ],
  templateUrl: './entity-edit.component.html',
  styleUrl: './entity-edit.component.scss'
})
export class EntityEditComponent implements OnInit {
  entityForm: FormGroup;
  isLoading$: Observable<boolean>;
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EntityEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entity: Entity },
    private store: Store<{ entity: Entity }>
  ) {
    this.entityForm = this.fb.group({
      businessName: [this.data.entity?.businessName, Validators.required],
      tradeName: [this.data.entity?.tradeName, Validators.required],
      cnpj: [this.data.entity?.cnpj, [Validators.required, cnpjValidator()]],
      region: [this.data.entity?.region, Validators.required],
      medicalSpecialties: [this.data.entity?.medicalSpecialties, Validators.required],
      inaugurationDate: [this.data.entity?.inaugurationDate, Validators.required],
      isActive: [this.data.entity?.isActive]
    });
    this.isLoading$ = this.store.select(EntitySelectors.selectIsLoading);
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.entityForm.valid) {
      const action = this.data.entity?.id
        ? EntityActions.updateEntity({ entity: { id: this.data.entity.id, ...this.entityForm.value } })
        : EntityActions.addEntity({ entity: this.entityForm.value });
      this.store.dispatch(action);
      this.dialogRef.close();
    } else {
      this.entityForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    if (this.data.entity?.id) {
      this.store.dispatch(EntityActions.deleteEntity({ id: this.data.entity.id }));
      this.dialogRef.close();
    }
  }
}
