import { Router } from 'express';
import productCtrl from '../controllerss/product';
import { errorWrapper } from '../error/errorWrapper';

const router = Router();

router.get('/', errorWrapper(productCtrl.get));
router.post('/', errorWrapper(productCtrl.create));


export default router;

