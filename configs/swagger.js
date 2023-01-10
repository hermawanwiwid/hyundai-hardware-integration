module.exports = {
  routePrefix: "/api/docs",
  openapi: {
    info: {
      title: "REST API for Hyundai QMS",
      description: "REST API for Hyundai QMS",
      version: "0.0.1",
      contact: {
        name: "Braga Tech Support",
        url: "https://braga.co.id/contact",
        email: "hermawan@braga.co.id",
      },
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    tags: [
      {
        name: "Auth",
        description:
          "Auth related endpoints, playground for token manipulation",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: require("../schema"),
    },
  },
  exposeRoute: true,
};
