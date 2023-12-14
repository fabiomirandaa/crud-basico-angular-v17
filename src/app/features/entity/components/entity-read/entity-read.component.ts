import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { EntityEditComponent } from "@features/entity/components/entity-edit/entity-edit.component";
import { Entity } from "@features/entity/models/entity.interface";
import { RegionLabelPipe } from "@features/entity/pipes/region-label.pipe";
import { SpecialtyLabelPipe } from "@features/entity/pipes/specialty-label.pipe";
import { NgxMaskPipe, provideNgxMask } from "ngx-mask";


@Component({
  selector: 'app-entity-read',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    NgxMaskPipe,
    SpecialtyLabelPipe,
    MatButtonModule,
    RegionLabelPipe,
  ],
  providers: [provideNgxMask()],
  templateUrl: './entity-read.component.html',
  styleUrl: './entity-read.component.scss'
})
export class EntityReadComponent {
  medicalSpecialties = [
    { value: 'f2332a24-17d0-44da-9e29-ef32667a9900', label: 'Cardiologia' },
    { value: 'f88e60fb-1b51-4231-af59-7e68bdd46da6', label: 'Dermatologia' },
    { value: '8b450a38-cd63-4ec0-b927-b75614d26858', label: 'Pediatria' },
    { value: '58c5fae9-b4d6-49eb-912e-88edb0640ead', label: 'Neurologia' },
    { value: '1eb02f11-4fa4-4d86-a4d2-f9c44e38e428', label: 'Ortopedia' },
    { value: 'b1c0159d-3f23-4c81-8ccc-c2a9e266c85d', label: 'Oftalmologia' },
    { value: '88fdf808-9400-4c1e-a342-f310337a3a09', label: 'Gastroenterologia' }
  ];
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
  entity = this.data.entity;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EntityReadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entity: Entity }
  ) { }

  onEdit(): void {
    // TODO: Refatorar para uso de rotas
    this.openEditEntityModal(this.entity);
    this.dialogRef.close();
  }

  openEditEntityModal(entity: Entity): void {
    this.dialog.open(EntityEditComponent, {
      width: '600px',
      data: { entity }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
