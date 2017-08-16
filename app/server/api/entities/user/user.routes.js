import { Router } from 'express';
import celebrate from 'celebrate';
import userValidation from './user.validator';
import * as UserController from './user.controller';
import { localAuth } from '@/services/auth.service';

const router = new Router();

router.post('/signup', celebrate(userValidation.post), UserController.signUp);
router.post('/login', localAuth, UserController.login);

export default router;