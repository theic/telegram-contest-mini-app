import { registerAs } from '@nestjs/config';

export default registerAs('open-ai', () => {
  const {
    OPENAI_API_KEY
  } = process.env;

  if (!OPENAI_API_KEY) {
    throw new Error('Open AI API key must be declared explicitly.');
  }

  return {
    apiToken: OPENAI_API_KEY,
  }
});
