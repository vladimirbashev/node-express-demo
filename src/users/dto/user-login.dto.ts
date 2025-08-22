import { IsEmail, IsString } from 'class-validator';
import {Expose} from 'class-transformer';

export class UserLoginDto {
	@Expose()
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@Expose()
	@IsString()
	password: string;
}
