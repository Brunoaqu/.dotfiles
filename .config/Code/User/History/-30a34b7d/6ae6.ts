import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

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

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  scanId: string[];
}
