import { FeatureType,  } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
} from 'class-validator';

export class QueryDataDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  location?: string;

  @IsOptional()
  @IsEnum(FeatureType)
  featureType?: FeatureType;

  @IsOptional()
  propertyType?: string

  @IsOptional()
  search?: string;

  @IsOptional()
  status?:boolean = false
}
