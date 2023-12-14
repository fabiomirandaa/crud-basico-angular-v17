import { RegionLabelPipe } from './region-label.pipe';

describe('RegionLabelPipe', () => {
  const mockRegions = [
    { value: 'uuid1', label: 'Alto tietê' },
    { value: 'uuid2', label: 'Interior' },
  ];

  const pipe = new RegionLabelPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform uuid to region label', () => {
    expect(pipe.transform('uuid1', mockRegions)).toBe('Alto tietê');
    expect(pipe.transform('uuid2', mockRegions)).toBe('Interior');
  });

  it('should return "Desconhecido" for unknown uuid', () => {
    expect(pipe.transform('unknown_uuid', mockRegions)).toBe('Desconhecido');
  });
});
