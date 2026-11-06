import reservoir from '../models/reservoir.js';

import * as reservoirModel from '../models/reservoirModel.js';

function validateId(receivedId){
	const id = Number(receivedId);
	return returnIdIfIdIsValid(id);
}

function returnIdIfIdIsValid(passedId){
	if (!Number.isInteger(passedId) || id <= 0){
		return returnIdTypeError();
	}
	return id;
}

function returnIdTypeError(){
	throw new TypeError('ID deve ser um número inteiro positivo.');
}

export async function list(pageAndLimit){
	verifyIfQueryIsTooBig(pageAndLimit);

}

function verifyIfQueryIsTooBig(pageAndLimit){
	const pageNum = Number(pageAndLimit[0]);
	const limitNum = Number(pageAndLimit[1]);

	if (!Number.isInteger(pageNum) || pageNum <= 0){
		throw new TypeError ('Página deve ser um número inteiro positivo')		
	}

	if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100 {
		throw new TypeError('Limite deve ser um número entre 1 e 100')
	}
}

async function makeListQuery(pageAndLimit){
	const p
}
