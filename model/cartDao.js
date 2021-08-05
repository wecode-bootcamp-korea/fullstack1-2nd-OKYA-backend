import prisma from '../prisma';

const findUser = async (id) => {
  return await prisma.user.findMany({
    where: {
      id: id,
    },
  });
};

const getCartItems = async (userId) => {
  return await prisma.cart.findMany({
    where: {
      userId: userId,
    },
    select: {
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
};

const updateCartItemQuantity = async (productId, quantity) => {
  return prisma.cart.update({
    data: {
      quantity: { increment: quantity },
    },
    where: {
      id: productId,
    },
  });
};

const deleteCartItems = async (productId) => {
  return prisma.cart.delete({
    where: {
      id: productId,
    },
  });
};

export default {
  findUser,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItems,
};
