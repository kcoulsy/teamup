import prisma from '../lib/prisma';
import { BadRequestError } from '../utils/error';
import { passwordSchema } from '../validation/password';
import { hash, verify } from '../utils/password';

export const authLogin = async (username: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (!user) throw new BadRequestError();

    const result = await verify(password, user.password);
    if (!result) throw new BadRequestError();

    return user;
  } catch (error) {
    throw new BadRequestError('Invalid Login');
  }
};

interface CreateUserOptions {
  username: string;
  email: string;
  password: string;
}

export const createUser = async ({
  username,
  email,
  password,
}: CreateUserOptions) => {
  try {
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser) throw new BadRequestError('Username Exists');

    const existingEmail = await prisma.user.findFirst({ where: { email } });
    if (existingEmail) throw new BadRequestError('Email Exists');

    const validatedPassword = passwordSchema.parse(password);

    let hashedPassword: string;

    try {
      hashedPassword = await hash(validatedPassword);
    } catch (error) {
      throw new BadRequestError('Password Error');
    }

    return await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        teamIDs: [],
        teamInviteIDs: [],
      },
    });
  } catch (error) {
    throw new BadRequestError('Unable to create user');
  }
};
