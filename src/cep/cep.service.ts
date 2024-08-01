import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { envoriment } from '../env/envoriment';

@Injectable()
export class CepService {
  async getAllCeps(cep: string[]) {
    const result = cep.map(async (cep) => {
      return await this.getCep(cep);
    });
    return await Promise.all(result);
  }

  async getCep(cep: any) {
    try {
      const response = await axios(`${envoriment.viaCepUrl}/${cep}/json/`);
      if (!response.data) {
        throw new Error('Erro ao buscar CEP');
      }
      const data = response.data;
      const cepFormatted = data.cep.replace('-', '');
      const label = `${data.logradouro}, ${data.localidade}`;
      return {
        cep: cepFormatted,
        label: label,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
      };
    } catch (error) {
      throw new InternalServerErrorException({ error: error.message });
    }
  }
}
