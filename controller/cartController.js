import { cartService } from '../service';

const getCartItems = async (req, res) => {
  try {
    const { id: userId } = req.foundUser[0];
    const cartItems = await cartService.getCartItems(userId);

    if (!cartItems.length) {
      return res
        .status(400)
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
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      const err = new Error('INVALID_CART_ITEM');
      err.statusCode = 400;
      throw err;
    } else {
      await cartService.updateCartItemQuantity(productId, quantity);
    }

    res.status(200).json({ message: 'CART_ITEM_QUANTITY_UPDATED_SUCCESFULLY' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { productId } = req.body;

    await cartService.deleteCartItems(productId);
    res.status(200).json({ message: 'CART_ITEM_DELETED_SUCCESSFULLY' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { getCartItems, updateCartItemQuantity, deleteCartItems };
