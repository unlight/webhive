import { IsString, IsUrl, IsDate, IsOptional, IsISO8601, MinLength } from 'class-validator';

/**
 * Represents create entry json object.
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
