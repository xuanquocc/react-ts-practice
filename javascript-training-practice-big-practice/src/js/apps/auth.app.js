import AuthModel from '../models/auth.model';
import AuthView from '../views/auth.view';
import AuthController from '../controllers/auth.controller';

new AuthController(new AuthModel(), new AuthView())

