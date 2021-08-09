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

const createCartItems = async (userId, quantity, productId) => {
  const createdCartItems = await prisma.cart.create({
    data: {
      user: {
        connect: { id: userId },
      },
      quantity: quantity,
      product: {
        connect: { id: productId },
      },
    },
  });
  return createdCartItems;
};

export default {
  getCartItems,
  updateCartItemQuantity,
  createCartItems,
  deleteCartItems,
};
