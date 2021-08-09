import { cartDao } from '../model';

const getCartItems = async (userId) => {
  const cartItems = await cartDao.getCartItems(userId);

  let newCartItems = [];
  for (let item of cartItems) {
    newCartItems.push({
      cartItemId: item.id,
      id: item.product.id,
      name: item.product.name,
      imageUrl: item.product.imageUrl,
      price: item.product.productGroup.price,
      description: item.product.productGroup.description,
    });
  }
  return newCartItems;
};

const updateCartItemQuantity = async (id, quantity, isIncrement) => {
  return await cartDao.updateCartItemQuantity(id, quantity, isIncrement);
};

export default { getCartItems, updateCartItemQuantity };
