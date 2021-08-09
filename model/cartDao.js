import prisma from '../prisma';

const getCartItems = async (userId) => {
  const cartItems = await prisma.cart.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      product: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          productGroup: {
            select: {
              price: true,
              description: true,
            },
          },
        },
      },
    },
  });

  return cartItems;
};

const updateCartItemQuantity = async (id, quantity, isIncrement) => {
  if (isIncrement === true) {
    await prisma.cart.updateMany({
      data: {
        quantity: { increment: quantity },
      },
      where: {
        id: id,
      },
    });
  } else {
    await prisma.cart.updateMany({
      data: {
        quantity: { decrement: quantity },
      },
      where: {
        id: id,
      },
    });
  }
};

const deleteCartItems = async (id) => {
  return prisma.cart.delete({
    where: {
      id: id,
    },
  });
};

export default { getCartItems, updateCartItemQuantity, deleteCartItems };
