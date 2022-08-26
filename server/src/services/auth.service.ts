import { User } from '@prisma/client';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../utils/error';

export const authLogin = async (username: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (!user) throw new BadRequestError();

    const result = bcrypt.compare(password, user.password);
    if (!result) throw new BadRequestError();

    return user;
  } catch (error) {
    throw new BadRequestError('Invalid Login');
  }
};

export const createUser = async ({
  username,
  email,
  password,
  fullName,
  occupation,
  aboutMe,
}: Partial<User>) => {
  try {
    // TODO: can this check on initial call with unique or something
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser) throw new BadRequestError('Username Exists');

    const existingEmail = await prisma.user.findFirst({ where: { email } });
    if (existingEmail) throw new BadRequestError('Email Exists');

    // TODO: fields/password validation
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName,
        occupation,
        aboutMe,
        teamIDs: [],
        teamInviteIDs: [],
      },
    });
  } catch (error) {
    throw new BadRequestError('Unable to create user');
  }
};
