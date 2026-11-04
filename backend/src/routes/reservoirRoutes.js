import express from 'express';
import * as reservoirController from '../controllers/reservoirController.js';
import { imageUpload } from '../middlewares/uploadMiddleware.js'

let authenticate = (_req, _res, next) => next();
let authorizeAdmin = (_req, _res, next) => next();

export const reservoirRouter = express.router();

function authorizeAdminAfterInitialVerification(){
	authorizeAdmin(req, res, next)
}

reservoirRouter.get('/', reservoirController.list);
reservoirRouter.get('/:id', reservoirController.searchById);
reservoirRouter.post('/', (req, res, next) => authenticate(req, res, next), reservoirController.create)
reservoirRouter.put(':/id', (req, res, next) => authenticate(req, res, next), reservoirController.update)
reservoirRouter.delete('/:id', (req, res, next) => authenticate(req, res, next), (req, res, next) => authorizeAdmin(req, res, next), reservoirController.delete)



