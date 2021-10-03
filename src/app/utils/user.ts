import { genSaltSync, hashSync } from 'bcrypt';

export const createHashedPassword = (password: string) => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
};
