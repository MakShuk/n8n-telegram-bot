// src/aeza-api/aeza-api.service.ts

import { Injectable } from '@nestjs/common';
import AezaApi from 'aeza-net-sdk';

@Injectable()
export class AezaApiService {
  private api: AezaApi;

  constructor() {
    this.api = new AezaApi('fgfdgfdrt5345657534gfdgf24');
  }

  async getAccount(): Promise<any> {
    return this.api
  }
}