import { Controller, Get, Param } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Busca CEP' })
  @ApiOkResponse({ description: 'CEP encontrado' })
  @ApiNotFoundResponse({ description: 'CEP não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro ao buscar CEP' })
  async getCep(@Param('cep') cep: string) {
    return this.cepService.getCep(cep);
  }
}
