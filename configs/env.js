module.exports = {
  confKey: "env", // optional, default: 'config'
  schema: {
    type: "object",
    required: ["TERMAL_PRINTER", "BASIC_PRINTER"],
    properties: {
      TERMAL_PRINTER: {
        type: "string",
      },
      BASIC_PRINTER: {
        type: "string",
      },
    },
  },
  dotenv: true,
};
