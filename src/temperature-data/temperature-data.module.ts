import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureDataService } from './services/temperature-data.service';
import { TemperatureDataController } from './controllers/temperature-data.controller';
import { TemperatureDataEntity } from './entities/temperatureData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemperatureDataEntity])],
  providers: [TemperatureDataService],
  controllers: [TemperatureDataController],
})
export class TemperatureDataModule {}
