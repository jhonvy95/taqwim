import jwt from "jsonwebtoken";

export const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED as string,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject("Can not generate token");
        }

        resolve(token);
      }
    );
  });
};
