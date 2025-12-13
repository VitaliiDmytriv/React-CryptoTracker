import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userFromBase = {
  id: "20dbe14c-641b-42fc-af7c-ac11be1b7c33",
  email: "vitaliqq.dmutriv@gmail.com",
  password: "$2a$12$kmdyUseGIWpdfBw40HuOHuD5lkriQPQWd.2Vt.Wzviyfrs7UFvTuu",
};

export const authService = {
  login: async (email: string, password: string) => {
    const secretKey = process.env.JWT_SECRET as string;
    // має бути пошук юзера у базі
    const user = userFromBase;
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, userFromBase.password);
    if (!isMatch) return null;

    const token = jwt.sign({ id: userFromBase.id, email: userFromBase.email }, secretKey);
    return { token, user: { id: userFromBase.id, email: userFromBase.email } };
  },
};
