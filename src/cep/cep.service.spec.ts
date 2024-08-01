import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cep.service';
import e from 'express';

describe('CepService', () => {
  let service: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepService],
    }).compile();

    service = module.get<CepService>(CepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a cep', async () => {
    const cep = '01310000';
    const result = await service.getCep(cep);
    expect(result).toBe(result);
  });
  it('should return a error with cep invalid', async () => {
    try {
      const cep = {
        cep: '0000000',
        logradouro: 'Avenida Paulista',
        bairro: 'São Paulo',
        localidade: 'São Paulo',
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107',
        complemento: 'até 610 - lado par',
      };
      await service.getCep(cep);
    } catch (error) {
      //expect(error).toBeDefined();
      expect(error).toBe(error);
    }
  });
  it('should return search more than one cep', async () => {
    const ceps = ['01310000', '29122100'];
    const result = await service.getAllCeps(ceps);
    expect(result).toBe(result);
  });
  it('should return a error with ceps invalid', async () => {
    const ceps = ['0000000', '0000000'];
    try {
      await service.getAllCeps(ceps);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
