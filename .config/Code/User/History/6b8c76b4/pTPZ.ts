import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class WoodLogsDTO {
  @IsString()
  @IsNotEmpty()
  woodLogName: string;

  @IsNumber()
  @IsOptional()
  frame: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  confiability: number;

  @IsNumber()
  @IsOptional()
  positionX: number;

  @IsNumber()
  @IsOptional()
  positionY: number;
}

export class UsedSettingsDTO {
  @IsNumber()
  @IsOptional()
  diameterFactor: number;

  @IsNumber()
  @IsOptional()
  volumeFactor: number;

  @IsBoolean()
  @IsOptional()
  overwrite: boolean;

  @IsNumber()
  @IsNotEmpty()
  updatedAtMs: number;
}
export class CreateScanDTO {
  @IsString()
  @IsOptional()
  clientToken: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  @Length(2, 255)
  reportName: string;

  @IsString()
  additionalInformation: string;

  @IsString()
  originalTimezone: string;

  @IsString()
  @IsISO8601()
  @IsNotEmpty()
  originalCreationDate: string;

  @IsString()
  appVersion: string;

  @IsString()
  scarfVersion: string;

  @IsString()
  device: string;

  @IsNumber()
  durationInSec: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  volume: number;

  @IsString()
  @IsOptional()
  volumeFormula: string;

  @IsString()
  @IsOptional()
  specieFound: string;

  @IsNumber()
  pileLength: number;

  @IsNumber()
  @IsOptional()
  pileWidth: number;

  @IsNumber()
  @IsOptional()
  pileHeight: number;

  @IsNumber()
  @IsOptional()
  sortingMin: number;

  @IsNumber()
  @IsOptional()
  sortingMax: number;

  @IsNumber()
  @IsOptional()
  area: number;

  @IsNumber()
  @IsOptional()
  avgFrameVolume: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => WoodLogsDTO)
  woodLogs: WoodLogsDTO[];
}
