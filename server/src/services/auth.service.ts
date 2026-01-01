import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userService } from "./user.service";
import { userSelectCredentials } from "./selections";

// const userFromBase = {
//   id: "20dbe14c-641b-42fc-af7c-ac11be1b7c33",
//   email: "vitaliqq.dmutriv@gmail.com",
//   password: "$2a$12$kmdyUseGIWpdfBw40HuOHuD5lkriQPQWd.2Vt.Wzviyfrs7UFvTuu",
// };

export const authService = {
  login: async (email: string, password: string) => {
    const secretKey = process.env.JWT_SECRET as string;
    // має бути пошук юзера у базі
    const user = await userService.getByEmail(email, userSelectCredentials);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "60m" });
    return { token, user: { ...userWithoutPassword } };
  },
};
