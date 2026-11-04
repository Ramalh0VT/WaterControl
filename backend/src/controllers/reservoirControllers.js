import * as reservoirService from '../service/reservoirService.js';

function returnError(error, res, next){
	resAndError = []
	if (error instanceof TypeError || error.message.includes('not found'){
		const resAndError = [];
		resAndError.push(error,res);
	}
	if (error instanceof TypeError){
		return returnResStatus404(resAndError);
	}
	else if (error.message.includes('not found')){
		return returnResStatus400(resAndError);
	}
	else{
		return next(error);
	}
}

function returnResStatus404(resAndError){
	const res = resAndError[0];
	const error = resAndError[1];
	return res.status(400).json({ success: false, error: error.message });
}

function returnResStatus400(resAndError){
	const res = resAndError[0];
	const error = resAndError[1];
	return res.status(400).json({ success: false, error: error.message });
}

export async function list(req, res, next){
	try{
		return attemptToReturnDataAndPaginationAndSuccess(req);
	}
	catch(error){
		return returnError(error, res, next)
	}
}

function attemptToReturnDataAndPaginationAndSuccess(req){
	const result = await reservoirService.list(req.query);
	return res.status(200).json({
		sucess: true,
		data: result.reservoirs,
		pagination: result.pagination
	)}
}

