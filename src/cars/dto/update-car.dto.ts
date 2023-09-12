import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDTO {
  @IsString()
  @IsUUID('4')
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly model?: string;
}
