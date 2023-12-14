export function isCNPJValid(cnpj: string): boolean {
  if (!cnpj || cnpj.length !== 14) {
    return false;
  }

  const calculateDigit = (numbers: string, positions: number) => {
    let index = 2;
    const sum = numbers.split('').reduceRight((accumulator, number) => {
      accumulator += Number(number) * index;
      index = (index < positions ? index + 1 : 2);
      return accumulator;
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const baseLength = cnpj.length - 2;
  const digits = cnpj.slice(-2);
  const calculated1 = calculateDigit(cnpj.substring(0, baseLength), 9);
  const calculated2 = calculateDigit(cnpj.substring(0, baseLength + 1), 9);

  return `${calculated1}${calculated2}` === digits;
}
