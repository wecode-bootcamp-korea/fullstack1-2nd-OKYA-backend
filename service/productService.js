import { productDao } from '../model';

const getProducts = async (productCategoryId) => {
  return await productDao.getProducts(productCategoryId);
};

export default { getProducts };
