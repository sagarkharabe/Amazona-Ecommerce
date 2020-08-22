import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import User from '../../models/User';

const router = Router();

router.get('/me', requireJwtAuth, (req, res) => {
    const me = req.user.toJSON();
    res.json({ me });
});

router.put('/register-seller', requireJwtAuth, async (req, res) => {
    const me = req.user.toJSON();
    try {
        const user = await User.findByIdAndUpdate(
            me.id,
            { isSeller: true },
            { new: true }
        )
        res.status(200).json({ data: user })
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
})

export default router;