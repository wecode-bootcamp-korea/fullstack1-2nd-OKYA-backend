import prisma from '../prisma';

const getProducts = async () => {
  return await prisma.productGroup.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      productCategoryId: true,
    },
    where: {
      productCategoryId: 1,
    },
  });
};

export default { getProducts };
