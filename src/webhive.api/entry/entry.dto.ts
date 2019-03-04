import { IsString, IsUrl, IsDate, IsOptional, IsISO8601, MinLength } from 'class-validator';

export class CreateEntryDTO {

    @IsString()
    @MinLength(3)
    title!: string;

    @IsUrl()
    link!: string;

    @IsISO8601()
    date!: string;

    @IsOptional()
    @IsString()
    category?: string;
}