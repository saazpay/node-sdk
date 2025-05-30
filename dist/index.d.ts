type TokenProps = {
    appId: string;
    userId?: string;
    expiresIn?: number;
};
declare const getAccessToken: ({ appId, userId, expiresIn, }: TokenProps) => string;

export { getAccessToken };
