import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

const generateToken = (user: User) => {
  // @TODO this is all wrong and the data can be accessed, it was wrong before too btw
  return jwt.sign(
    {
      user,
    },
    '1234'
  );
};

export const authLogin = async (username: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username },
      include: { teams: {} },
    });
    // const user = await User.findByCredentials(username, password);
    if (!user) throw new Error();

    const result = bcrypt.compare(password, user.password);

    if (!result) throw new Error();

    const token = generateToken(user);

    return { token, user };
  } catch (error) {
    throw new Error('Invalid Login');
  }
};

type AuthJWT = { user: User };

export const authWithToken = async (token: string) => {
  let decodedJwt: { user: User };

  if (!token) return null;

  try {
    decodedJwt = jwt.verify(token, process.env.JWT_SECRET) as AuthJWT;
  } catch (err) {
    console.log(err);
  }

  return decodedJwt.user;
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
    // @TODO: can this check on initial call with unique or something
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser) throw new Error('username exists');
    const existingEmail = await prisma.user.findFirst({ where: { email } });
    if (existingEmail) throw new Error('email exists');

    // @TODO: fields/password validation
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
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

    const token = generateToken(user);
    // @TODO: don't return password
    return { token, user };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to create user');
  }
};
