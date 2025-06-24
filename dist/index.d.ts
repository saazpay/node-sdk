type TokenProps = {
    appId: string;
    userId?: string;
    expiresIn?: number;
};
declare const getAccessToken: ({ appId, userId, expiresIn, }: TokenProps) => string;
interface IPlan {
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
interface IProduct {
    id: string;
    name: string;
    description: string;
    image_url: string;
    application_id: string;
    createdAt: string;
    updatedAt: string;
}
declare const getPlans: ({ appId, }: {
    appId: string;
}) => Promise<IPlan[]>;
interface ISubscription {
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
declare const getActiveSubscription: ({ appId, userId, }: {
    appId: string;
    userId: string;
}) => Promise<ISubscription>;

export { IPlan, IProduct, ISubscription, getAccessToken, getActiveSubscription, getPlans };
