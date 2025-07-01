const baseUrl: string | undefined = process.env.SAAZPAY_BASE_URL;

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
      return err;
    });

  return res;
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
      return err;
    });

  return res;
};

export interface IManagementUrl {
  customerPortal: string;
  cancelSubscription: string;
  updatePaymentMethod: string;
}
export const getManagementUrls = async ({
  appId,
  subscriptionId,
}: {
  appId: string;
  subscriptionId: string;
}): Promise<IManagementUrl> => {
  if (!baseUrl) {
    throw new Error("Saazpay base URL is not defined");
  }
  const res = await fetch(
    `${baseUrl}/api/v1/subscriptions/management?appId=${appId}&subscriptionId=${subscriptionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SAAZPAY_API_KEY}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return "";
    });

  return res;
};

export interface IProration {
  currencyCode: string;
  proratedCharge: number;
  creditAmount: number;
  subTotal: number;
  tax: number;
  discount: number;
  creditApplied: number;
  grandTotal: number;
}

export const previewPlan = async ({
  subscriptionId,
  newPlanId,
  appId,
}: {
  subscriptionId: string;
  newPlanId: string;
  appId: string;
}): Promise<IProration> => {
  if (!baseUrl) {
    throw new Error("Saazpay base URL is not defined");
  }
  const res = await fetch(
    `${baseUrl}/api/v1/subscriptions/management/preview-plan?appId=${appId}&subscriptionId=${subscriptionId}&newPlanId=${newPlanId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SAAZPAY_API_KEY}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });

  return res;
};

export interface IUpdatePlan {
  id: string;
  status: string;
}

export const changePlan = async ({
  subscriptionId,
  newPlanId,
  appId,
}: {
  subscriptionId: string;
  newPlanId: string;
  appId: string;
}): Promise<IUpdatePlan> => {
  if (!baseUrl) {
    throw new Error("Saazpay base URL is not defined");
  }
  const res = await fetch(
    `${baseUrl}/api/v1/subscriptions/management/change-plan?appId=${appId}&subscriptionId=${subscriptionId}&newPlanId=${newPlanId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SAAZPAY_API_KEY}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });

  return res;
};
