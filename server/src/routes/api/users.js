import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
const router = Router();

router.get('/me', requireJwtAuth, (req, res) => {
    const me = req.user.toJSON();
    res.json({ me });
});

export default router;