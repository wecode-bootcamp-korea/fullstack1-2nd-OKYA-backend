import { cartDao } from '../model';

const getCartItems = async (userId) => {
  const cartItems = await cartDao.getCartItems(userId);

  let newCartItems = [];
  for (let item of cartItems) {
    newCartItems.push({
      id: item.product.id,
      name: item.product.name,
      imageUrl: item.product.imageUrl,
      price: item.product.productGroup.price,
      description: item.product.productGroup.description,
    });
  }
  return newCartItems;
};

export default { getCartItems };
