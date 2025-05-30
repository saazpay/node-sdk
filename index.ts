import jwt from "jsonwebtoken";

const secretKey: jwt.Secret | undefined = process.env.SAAZPAY_SECRET_KEY;

type TokenProps = {
  appId: string;
  userId?: string;
  expiresIn?: number;
};

export const getAccessToken = ({
  appId,
  userId,
  expiresIn = 60,
}: TokenProps): string => {
  if (!secretKey) {
    throw new Error("Saazpay secret key is not defined");
  }

  const formattedPrivateKey = `-----BEGIN PRIVATE KEY-----\n${secretKey}\n-----END PRIVATE KEY-----`;
  return jwt.sign(
    {
      userId,
      appId,
    },
    formattedPrivateKey,
    { expiresIn: expiresIn, algorithm: "ES256" }
  );
};
