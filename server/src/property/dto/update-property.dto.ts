import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsEnum,
  Min,
  IsOptional,
} from 'class-validator';
import { FeatureType, PropertyType, PropertyStatus } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @IsString({ message: 'House name should be a string' })
  @IsOptional()
  propertyName?: string;

  @IsEnum(PropertyType, { message: 'Invalid property type' })
  @IsOptional()
  propertyType?: PropertyType;

  @IsEnum(FeatureType, { message: 'Invalid feature type' })
  @IsOptional()
  featureType?: FeatureType;

  @IsNumber({}, { message: 'Price should be a number' })
  @IsOptional()
  @Min(0, { message: 'Price should be a positive number' })
  price?: number;

  @IsNumber({}, { message: 'Build year should be a number' })
  @IsOptional()
  @Min(1800, { message: 'Build year should be at least 1800' })
  buildYear?: number;

  @IsString({ message: 'Location should be a string' })
  @IsOptional()
  location?: string;

  @IsNumber({}, { message: 'Square area should be a number' })
  @IsOptional()
  @Min(0, { message: 'Square area should be a positive number' })
  sqArea?: number;

  @IsString({ message: 'Description should be a string' })
  @IsOptional()
  @MinLength(10, {
    message: 'Description should be at least 10 characters long',
  })
  description?: string;

  @IsEnum(PropertyStatus, { message: 'Invalid property status' })
  @IsOptional()
  status?: PropertyStatus;
}
