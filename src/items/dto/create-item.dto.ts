import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    name: string;
    
    price: number;

    @IsNotEmpty()
    description: string;
}
