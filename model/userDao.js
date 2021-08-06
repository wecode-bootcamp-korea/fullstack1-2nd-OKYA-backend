import prisma from '../prisma';

const findUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

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

export default { findUser, getEmail, getUsers, createUser };
