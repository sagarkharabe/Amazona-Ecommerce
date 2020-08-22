import { Router } from "express";
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Rating, { validateRating } from '../../models/Rating';
import Product from "../../models/Product";

const router = Router();

// Get user rating for a product 
router.get('/:productId', requireJwtAuth, async (req, res) => {
    try {
        const rating = await Rating.findOne({ product: req.params.productId, user: req.user.id })
        if (!rating) return res.status(400).json({ message: 'No user rating found.' })
        return res.status(200).json({ data: rating })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
})

// Create Rating
router.post('/:productId', requireJwtAuth, async (req, res) => {
    const { error } = validateRating(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const temp = await Rating.findOne({ product: req.params.productId, user: req.user.id })
        if (temp) return res.status(400).json({ message: 'Already rated the product.' })

        const product = await Product.findById(req.params.productId);
        let rating = await Rating.create({
            rate: req.body.rate,
            product: product.id,
            user: req.user.id
        })
        product.avgRating = product.avgRating ? (product.avgRating + rating.rate) / 2 : rating.rate;

        await product.save();

        res.status(200).json({ data: rating })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }

})

// update rating
router.put('/:productId', requireJwtAuth, async (req, res) => {
    const { error } = validateRating(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const rating = await Rating.findOneAndUpdate({ product: req.params.productId, user: req.user.id }, {
            rate: req.body.rate
        })
        const product = await Product.findById(req.params.productId);
        const allProductRatings = await Rating.find({ product: req.params.productId })
        const avgRating = allProductRatings.reduce((acc, p) => ((acc + p.rate) / 2), allProductRatings[0].rate)
        product.avgRating = avgRating;
        await product.save()

        res.status(200).json({ data: { product, rating } })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' })
    }
})

export default router;