module.exports = {
  secret: {
    private: process.env.JWT_PRIVATE_KEY.replace(/___/g, "\n"),
    public: process.env.JWT_PUBLIC_KEY.replace(/___/g, "\n"),
  },
  sign: {
    algorithm: "RS256",
  },
};
