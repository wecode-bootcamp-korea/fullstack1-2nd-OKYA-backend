import prisma from '../prisma';

const findUserByEmail = async (email) => {
  const existingUser = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
    },
    where: {
      email: `${email}`,
    },
  });
  return existingUser;
};

const saveUserByKakao = async (email) => {
  const user = await prisma.user.create({
    data: {
      email: `${email}`,
      socialPlatform: 'kakao',
    },
  });
  return user;
};

export default { findUserByEmail, saveUserByKakao };
