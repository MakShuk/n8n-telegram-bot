// src/aeza-api/aeza-api.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AezaApi from 'aeza-net-sdk';

@Injectable()
export class AezaApiService {
  private api: AezaApi;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('AEZA_TOKEN');
    if (!token) {
      throw new Error('AEZA_TOKEN is not set in environment variables');
    }
    this.api = new AezaApi(token);
  }

  async getAccount(): Promise<any> {
   
    const { response } = await this.api.profile.get();
    console.log(response);
    return response;
  }
}