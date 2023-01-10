// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true || process.env.NODE_ENV !== "production",
});
fastify.decorate("env", require("env-schema")(require("./configs/env")));

// Register core plugins
const path = require("path");
const AutoLoad = require("@fastify/autoload");
const multipart = require("@fastify/multipart");
fastify.register(require("@fastify/swagger"), require("./configs/swagger"));
fastify.register(
  require("@fastify/swagger-ui"),
  require("./configs/swagger-ui")
);
fastify.register(multipart);
fastify.register(require("@fastify/cors"), require("./configs/cors"));

// fastify.register(require("@fastify/jwt"), require("./configs/jwt"));
// fastify.register(require("fastify-static"), require("./configs/static"));
// fastify.decorate("authenticate", async function (req, reply) {
//   try {
//     await req.jwtVerify();
//   } catch (err) {
//     reply.send(err);
//   }
// });

// Register custom routes (route included)
fastify.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
  options: { prefix: "/api" },
});

// Run the server!
fastify.ready((err) => {
  if (err) throw err;
  fastify.swagger();
});

async function closeGracefully(signal) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`);

  await fastify.close();
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.exit();
}
process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);

const start = async () => {
  try {
    const port = fastify.env.PORT ?? "5000";
    await fastify.listen({
      port: port,
      host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    });
    console.log(`Listening on port : ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
