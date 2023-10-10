import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import OpenaiConfig from '../../config/open-ai';
import { ConfigType } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class WhisperService {
  private readonly client: OpenAI;
  private readonly clientAxios: AxiosInstance;

  constructor(
    @Inject(OpenaiConfig.KEY)
    private readonly openaiConfig: ConfigType<typeof OpenaiConfig>,
  ) {
    this.client = new OpenAI({
      apiKey: this.openaiConfig.apiToken,
    });

    this.clientAxios = axios.create();
  }

  async createTranscription(link: string, name: string): Promise<string> {
    const response = await this.clientAxios.get(link, { responseType: 'stream' });

    const file = await OpenAI.toFile(response.data, name);

    try {
      const response = await this.client.audio.transcriptions.create({
        model: 'whisper-1',
        file,
        response_format: 'vtt',
        temperature: 0.5,
        language: 'en',
      }
      );

      return response + '';

    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }

      throw new Error('Error creating transcription');
    }
  }
}
