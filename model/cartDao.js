import prisma from '../prisma';

const getCartItems = async (userId) => {
  const cartItems = await prisma.cart.findMany({
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

  return cartItems;
};

export default {
  getCartItems,
};
