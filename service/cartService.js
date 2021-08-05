import { cartDao } from '../model';

const getCartItems = async (userId) => {
  return await cartDao.getCartItems(userId);
};

const updateCartItemQuantity = async (productId, quantity) => {
  return await cartDao.updateCartItemQuantity(productId, quantity);
};

const deleteCartItems = async (productId) => {
  return await cartDao.deleteCartItems(productId);
};

export default { getCartItems, updateCartItemQuantity, deleteCartItems };
