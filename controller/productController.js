import { productService } from '../service';

const showProducts = async (req, res) => {
  try {
    const productCategoryId = req.query.productCategoryId;
    let products = await productService.getProducts(productCategoryId);

    res.status(200).json({ products });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { showProducts };
