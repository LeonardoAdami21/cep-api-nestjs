import * as dotenv from 'dotenv';
dotenv.config();

export const envoriment = {
  appPort: process.env.APP_PORT || 3000,
  viaCepUrl: process.env.VIACEP_URL,
};
