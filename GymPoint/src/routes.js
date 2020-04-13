import { Router } from 'express';
import UserCtrl from './app/controllers/UserController';
import SessionCtrl from './app/controllers/SessionController';
import StudentCtrl from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const route = Router();

route.post('/users', UserCtrl.store);
route.post('/sessions', SessionCtrl.store);
route.use(authMiddleware);
route.put('/users', UserCtrl.update);
route.post('/students', StudentCtrl.store);
route.put('/students', StudentCtrl.update);
export default route;
