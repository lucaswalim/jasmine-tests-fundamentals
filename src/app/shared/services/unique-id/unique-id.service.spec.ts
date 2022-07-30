import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {

  let service: UniqueIdService = null;

  beforeEach(() => {
    service = new UniqueIdService();
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
    const service = new UniqueIdService();
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate IDs when called multiple times`, () => {
    const service = new UniqueIdService();

    // Set não permite repitir Ids, ou seja, no loop tentara 50 vezes se, por acaso existir 1 igual não ira inserir, então tera menos de 50
    let ids = new Set();

    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }

    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} should return the number of generatedIds when called`, () => {
    service.generateUniqueIdWithPrefix('app-');
    service.generateUniqueIdWithPrefix('app-');
    service.generateUniqueIdWithPrefix('app-');

    expect(service.getNumberOfGeneratedUniqueIds()).toBe(3);
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix} should throw when called with empty`, () => {
    /*
    expect(() => service.generateUniqueIdWithPrefix(null)).toThrow();
    expect(() => service.generateUniqueIdWithPrefix(undefined)).toThrow();
    expect(() => service.generateUniqueIdWithPrefix('')).toThrow();
    */
    const emptyValues = [null, undefined, '', '0'];
    emptyValues.forEach(emptyValue => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
      .withContext(`Empty value: ${emptyValue}`) // Caso algum falhe, vai mostrar qual valor específico falhou
      .toThrow();
    })
  })

})
