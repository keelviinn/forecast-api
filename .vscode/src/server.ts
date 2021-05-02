require('dotenv').config();
import './util/modulo-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import { ForecastController } from './controllers/forecast';

export class SetupServer extends Server {
  public express: express.Application
  
  constructor (private port = 8081) {
    super();
    this.express = express()
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }
  
  private setupExpress(): void {
    this.express.use(express.json());
  }
  private setupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }

  public getApp(): Application {
    return this.app;
  }
}

