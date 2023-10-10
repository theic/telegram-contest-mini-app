import { registerAs } from '@nestjs/config';

export default registerAs('server', () => {
  return {
    port: +(process.env.SERVER_PORT || 3000),
  publicOrigin: process.env.PUBLIC_ORIGIN || 'http://localhost:3000',
  }
});
