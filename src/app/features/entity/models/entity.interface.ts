export interface Entity {
  id: number;
  businessName: string;
  tradeName: string;
  cnpj: string;
  region: string;
  inaugurationDate: Date;
  isActive: boolean;
  medicalSpecialties: string[];
}
