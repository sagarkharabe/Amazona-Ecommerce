import { Router } from 'express';
import usersRoutes from './users';
import productRoutes from './products'
const router = Router();

router.use('/users', usersRoutes);

router.use('/products', productRoutes);

export default router;
