import prisma from '../prisma';

const getEmail = async (email) => {
  return await prisma.user.findMany({
    where: {
      email: `${email}`,
    },
  });
};

const getUsers = async (email) => {
  return await prisma.user.findMany({
    select: {
      email: true,
      password: true,
    },
    where: {
      email: `${email}`,
    },
  });
};

const createUser = async (
  email,
  password,
  name,
  phone_number,
  road_address,
  detail_address,
  zip_code
) => {
  return await prisma.user.create({
    data: {
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
      phoneNumber: `${phone_number}`,
      roadAddress: `${road_address}`,
      detailAddress: `${detail_address}`,
      zipCode: `${zip_code}`,
    },
  });
};

export default { getEmail, getUsers, createUser };
