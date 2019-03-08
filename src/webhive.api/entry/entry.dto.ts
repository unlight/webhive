import { IsString, IsUrl, IsDate, IsOptional, IsISO8601, MinLength } from 'class-validator';

/**
 * Create entry DTO.
 */
export class CreateEntryDTO {

    @IsString()
    @MinLength(2)
    title!: string;

    @IsUrl()
    link!: string;

    @IsISO8601()
    date!: string;

    @IsOptional()
    @IsString()
    category?: string;
}
