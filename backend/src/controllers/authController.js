import * as authService from '../services/AuthService.js';

function returnError(error, res, next){
	const resAndError = [];
	if (error instanceof TypeError || error.status === 409 || error.status === 401){
		resAndError.push(res, error);
	}
	i
}

function returnError422(resAndError){
	const res = resAndError[0];
	const error = resAndError[1];
	return res.status(422).json({ success: false, error: error.message });
}

function returnError409(resAndError){
	const res = resAndError[0];
	const error = resAndError[1];
	return res.status(409).json({ success: false, error: error.message });
}

function returnError401(resAndError){
	const res = resAndError[0];
	const error = resAndError[1];
	return res.status(401).json({ success: false, error: error.message });
}
