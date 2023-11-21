import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class ReportSettings {
  @IsNumber()
  @IsOptional()
  diameterFactor: number;

  @IsNumber()
  @IsOptional()
  volumeFactor: number;
}

export class CreateMergedDTO {
  @IsString()
  @IsNotEmpty()
  @Length(21)
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Length(21)
  decodedUserId: string;

  @IsOptional()
  @IsString()
  @Length(2, 255)
  reportName: string;

  @IsString()
  appVersion: string;

  @IsString()
  device: string;

  @IsString()
  additionalInformation: string;

  @IsString()
  originalTimezone: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  originalCreationDate: string;

  @Type(() => ReportSettings)
  @ValidateNested()
  @IsOptional()
  reportSettings: ReportSettings;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  scanId: string[];
}
