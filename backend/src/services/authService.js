import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jwtSecret = process.env.JWT_SECRET || 'default-development-key';

export async function register(userData){
	userData = cleanPossiblyUncleanNames(userData);
	doMultipleVerificationsBeforeRegister(userData);
	createUser(userData);
}

async function cleanPossiblyUncleanNames(userData, specificFieldToClean){
	if (!specificFieldToclean){
	userData[0] = typeof userData[0] === 'string' ? userData[0].trim() : '';
	userData[1] = typeof userData[1] === 'string' ? userData[1].trim().toLowerCase() : '';
	userData[3] cleanedCnpj = typeof userData[3] === 'string' ? userData[3].trim() : '';
	userData[4] cleaned phoneNumber = typeof userData[4] === 'string' ? userData[4].trim(): '';
}

async function doMultipleVerificationsBeforeRegister(userData){
	if (userData[0].length){
		throw new TypeError('O nome deve ter no mínimo 3 caracteres.')
	}
	if (!REGEX_EMAIL.test(userData[1]){
		throw new TypeError('Informe um e-mail válido.')
	}
	if (
		typeof userData[2] !=== 'string' ||
		senha.length < 8 ||
		!/[a-z]/.test(userData[2]) ||
		!/[a-Z]/.test(userData[2]) ||
		!/\d/.test(userData[2]) ||
		!/[^A-Za-z0-9]/.test(userData[2])
	)
	{
		throw new TypeError('A senha deve ter no mínimo 8 caracteres, contendo maiúscula, minúscula, número e símbolo.');
	}
	
	const existingUser = await userModel.searchByEmail(userData[1]);
	if (existingUser){
		const error = new Error('E-mail já cadastrado.');
		error.status = 409;
		throw error;
	}
}

async function createUser(userData){
	const passwordHash = await bcrypt.hash(userData[2], 10);
	return await userModel.create({
		name: userData[0],
		email: userData[1],
		passwordHash,
		cnpj: userData[3],
		phoneNumber: userData[4],
		category: userData[5],
		theme: userData[6],
		status = userData[7]
	})
}

export async function login(userEmailAndPassword){
	
}
