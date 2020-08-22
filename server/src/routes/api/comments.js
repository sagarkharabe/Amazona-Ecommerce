import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Comment, { validateComment } from '../../models/Comment';
import Product from '../../models/Product';
const router = Router();

// create a comment
router.post('/:productId', requireJwtAuth, async (req, res) => {
    const { error } = validateComment(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        const product = await Product.findById(req.params.productId);
        const comment = await Comment.create({
            product: product.id,
            user: req.user.id,
            comment: req.body.comment
        })
        product.comments = product.comments.concat(comment.id)
        await product.save()
        res.status(200).json({ data: comment })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
})

export default router;