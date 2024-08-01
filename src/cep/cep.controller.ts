import { Controller, Get, Param, Query } from '@nestjs/common';
import { CepService } from './cep.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('cep')
@ApiTags('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get('/:cep')
  @ApiOperation({ summary: 'Retorna um Cep' })
  @ApiOkResponse({ description: 'CEP encontrado' })
  @ApiNotFoundResponse({ description: 'CEP não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro ao buscar CEP' })
  async getCep(@Param('cep') cep: string) {
    try {
      const searchCep = await this.cepService.getCep(cep);
      return searchCep;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('/search/:cep')
  @ApiOperation({ summary: 'Retorna um ou mais Cep' })
  @ApiOkResponse({ description: 'CEP encontrado' })
  @ApiNotFoundResponse({ description: 'CEP não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro ao buscar CEP' })
  async getAllCeps(@Query('cep') cep: string[]) {
    return await this.cepService.getAllCeps(cep);
  }
}
