import jwt from "jsonwebtoken";

const secretKey: jwt.Secret | undefined = process.env.SAAZPAY_CLIENT_KEY;
const baseUrl: string | undefined = process.env.SAAZPAY_BASE_URL;

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

export interface IPlan {
  id: string;
  price: number;
  currency: string;
  tax_mode: string;
  name: string;
  description: string;
  billing_frequency: number;
  billing_interval: string;
  trial_frequency: null;
  trial_interval: null;
  quantity_minimum: number;
  quantity_maximum: number;
  product_id: string;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  image_url: string;
  application_id: string;
  createdAt: string;
  updatedAt: string;
}

export const getPlans = async ({
  appId,
}: {
  appId: string;
}): Promise<IPlan[]> => {
  if (!baseUrl) {
    throw new Error("Saazpay base URL is not defined");
  }
  const res = await fetch(`${baseUrl}/api/v1/plans?id=${appId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SAAZPAY_API_KEY}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return res as IPlan[];
};

export interface ISubscription {
  id: string;
  customer_id: string;
  unique_identifier: string;
  status: string;
  paused_at: null;
  canceled_at: null;
  scheduled_change: null;
  next_billed_at: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
  applicationId: string;
  product: ISubscriptionProduct;
  price: ISubscriptionPrice;
}

interface ISubscriptionPrice {
  id: string;
  name: string;
  description: string;
  product_id: string;
  billing_frequency: number;
  billing_interval: string;
  trial_frequency: number;
  trial_interval: string;
  currency: string;
  price: number;
}

interface ISubscriptionProduct {
  id: string;
  name: string;
  description: string;
  image_url: string;
}
export const getActiveSubscription = async ({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}): Promise<ISubscription> => {
  if (!baseUrl) {
    throw new Error("Saazpay base URL is not defined");
  }
  const res = await fetch(
    `${baseUrl}/api/v1/subscriptions?appId=${appId}&userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SAAZPAY_API_KEY}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return res;
};
