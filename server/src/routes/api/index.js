import { Router } from 'express';
import usersRoutes from './users';
import productRoutes from './products'
import ratingRoutes from './ratings'

const router = Router();

router.use('/users', usersRoutes);

router.use('/products', productRoutes);

router.use('/ratings', ratingRoutes);

export default router;
