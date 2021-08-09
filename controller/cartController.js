import { cartService } from '../service';

const getCartItems = async (req, res) => {
  try {
    const { id: userId } = req.foundUser;
    const cartItems = await cartService.getCartItems(userId);

    if (!cartItems.length) {
      return res
        .status(404)
        .json({ message: 'CART_ITEM_NOT_FOUND', cartItems });
    }
    res.status(200).json({ message: 'SUCCESS', cartItems });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { id: userId } = req.foundUser;
    const { id, quantity, isIncrement } = req.body;

    if (!quantity) {
      const err = new Error('KEY_ERROR');
      err.statusCode = 400;
      throw err;
    } else {
      await cartService.updateCartItemQuantity(id, quantity, isIncrement);
    }

    res.status(200).json({ message: 'CART_ITEM_QUANTITY_UPDATED_SUCCESFULLY' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { getCartItems, updateCartItemQuantity };
