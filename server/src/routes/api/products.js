import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Product, { validateProduct } from '../../models/Product';
import Rating from '../../models/Rating';

const router = Router();

// get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ data: products })
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
})

// get all products for a seller
router.get('/seller', async (req, res) => {
    if (!req.user.isSeller) return res.status(400).json({ message: 'Register for seller.' })
    try {
        const products = await Product.find({ seller: req.user.id });
        return res.status(200).json({ data: products })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong.' })
    }
})

// get by Id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller')
            .populate({ path: 'comments', populate: { path: 'user' } });

        if (!product) return res.status(404).json({ message: 'Product doesn\'t exist' });

        const numRatings = await Rating.count({ product: req.params.id });

        return res.status(200).json({ data: { ...product._doc, numRatings } })
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
})

// create one
router.post('/', requireJwtAuth, async (req, res) => {
    const me = req.user.toJSON();
    if (!me.isSeller) return res.status(400).json({ message: "Sign up for Seller" })

    const { value, error } = validateProduct(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        let product = await Product.create({
            ...value,
            avgRating: 0,
            seller: me.id,
            comments: []
        })
        product = await product.populate('seller').execPopulate()

        return res.status(200).json({ data: product })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }

})

// update one
router.put('/:id', requireJwtAuth, async (req, res) => {
    const { value, error } = validateProduct(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const temp = await Product.findById(req.params.id).populate('seller');
        if (!temp || !req.user.isSeller || req.user.id !== temp.seller.id)
            return res.status(401).json({ message: "You don't have access." })

        let product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...value },
            { new: true }
        )
        if (!product) return res.status(404).json({ message: 'No product found.' });

        product = await product.populate('seller')
            .populate({ path: 'comments', populate: { path: 'user' } })
            .execPopulate()

        return res.status(200).json({ data: product })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// delete one
router.delete('/:id', requireJwtAuth, async (req, res) => {
    try {
        const temp = await Product.findById(req.params.id).populate('seller');
        if (!temp || !req.user.isSeller || req.user.id !== temp.seller.id)
            return res.status(401).json({ message: "You don't have access." })

        const product = await Product.findByIdAndRemove(req.params.id).populate('seller');
        if (!product) return res.status(404).json({ message: 'No product found.' });

        res.status(200).json({ data: product })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
})


export default router;