import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware); // Obedece a ordem das funções. Só é executados nas rotas abaixo
routes.get('/schedule', ScheduleController.index);
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/providers', ProviderController.index);
routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users', UserController.update);

export default routes;
