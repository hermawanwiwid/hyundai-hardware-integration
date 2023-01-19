const { BasicMessage, BasicId } = require("../../schema");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/id",
    {
      schema: {
        description: "Get Dealer ID",
        tags: ["Dealer"],
        summary: "Get Dealer ID",
        response: {
          200: { ...BasicId, description: "Successful response" },
          500: { ...BasicMessage, description: "Failed response" },
          400: { ...BasicMessage, description: "Auth Failed" },
        },
      },
    },
    async function (request, reply) {
      let dealerId = process.env.DEALER_ID;
      return { id: dealerId };
    }
  );
};
