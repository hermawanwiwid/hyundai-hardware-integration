module.exports = {
  confKey: "env", // optional, default: 'config'
  schema: {
    type: "object",
    required: ["TERMAL_PRINTER", "BASIC_PRINTER", "DEALER_ID"],
    properties: {
      TERMAL_PRINTER: {
        type: "string",
      },
      BASIC_PRINTER: {
        type: "string",
      },
      DEALER_ID: {
        type: "string",
      },
    },
  },
  dotenv: true,
};
