import { Router } from 'express';
import shopifyCtrl from '../controllerss/shopify';
import { errorWrapper } from '../error/errorWrapper';

const router = Router();

router.get('/', errorWrapper(shopifyCtrl.home));
router.get('/login', errorWrapper(shopifyCtrl.login));
router.get('/auth/callback', errorWrapper(shopifyCtrl.auth));

export default router;

