import o from"jsonwebtoken";var e=process.env.SAAZPAY_SECRET_KEY,p=({appId:r,userId:n,expiresIn:t=60})=>{if(!e)throw new Error("Saazpay secret key is not defined");let s=`-----BEGIN PRIVATE KEY-----
${e}
-----END PRIVATE KEY-----`;return o.sign({userId:n,appId:r},s,{expiresIn:t,algorithm:"ES256"})};export{p as getAccessToken};
//# sourceMappingURL=index.js.map