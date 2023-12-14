import { SpecialtyLabelPipe } from './specialty-label.pipe';

describe('SpecialtyLabelPipe', () => {
  const mockSpecialties = [
    { value: 'uuid1', label: 'Cardiologia' },
    { value: 'uuid2', label: 'Dermatologia' },
  ];

  const pipe = new SpecialtyLabelPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform uuid to specialty label', () => {
    expect(pipe.transform('uuid1', mockSpecialties)).toBe('Cardiologia');
    expect(pipe.transform('uuid2', mockSpecialties)).toBe('Dermatologia');
  });

  it('should return "Desconhecido" for unknown uuid', () => {
    expect(pipe.transform('unknown_uuid', mockSpecialties)).toBe('Desconhecido');
  });
});
