module.exports = {
  database: "mongodb://localhost:27017/fyp",
  port: 4000,
  secretKey: "My secret key",
  secretKey2: "My Second secrete key",
  name: "nodeStore",

  locale: {
    lang: "en-US",
    currency: "USD"
  },

  plan: {
    storeFee: 50,
    productFee: 10
  },

  stripe: {
    secretKey: "sk_test_1pCiUl2rYmR3roCalECLJ7hk00HgggnfX3",
    publicKey: "pk_test_n6xOTv03wFH9y3OEIBUM2Pl100yMQXklX0"
  }
};
