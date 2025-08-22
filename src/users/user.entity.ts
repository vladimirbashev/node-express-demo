import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	private readonly _email: string;
	private readonly _name: string;

	constructor( _email: string, _name: string,
		passwordHash?: string
	) {
		this._email = _email;
		this._name = _name;
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
