import { ProModule } from './pro.module';

describe('ProModule', () => {
  let proModule: ProModule;

  beforeEach(() => {
    proModule = new ProModule();
  });

  it('should create an instance', () => {
    expect(proModule).toBeTruthy();
  });
});
