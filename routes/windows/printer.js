const { BasicMessage } = require("../../schema");
const { getPrinters, print } = require("pdf-to-printer");
const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

module.exports = async (fastify, options) => {
  fastify.get(
    "/listprinter",
    {
      schema: {
        description: "Get list printer from Windows OS",
        tags: ["Printer"],
        summary: "Get list printer from Windows OS",
        response: {
          200: {
            type: "object",
            properties: { message: { type: "array" } },
            description: "Successful response",
          },
          500: { ...BasicMessage, description: "Failed response" },
        },
      },
    },
    async (request, reply) => {
      const printers = await getPrinters();

      reply.send({
        message: printers,
      });
    }
  );
  fastify.post(
    "/print",
    {
      schema: {
        description: "Print from Windows OS",
        tags: ["Printer"],
        summary: "Print from Windows OS",
      },
    },
    async (request, reply) => {
      const fileToPrint = "./filetoprint.pdf";
      const parts = await request.file();
      const istermal = (await parts.fields.istermal?.value) === "true";
      let printer = "";

      if (Boolean(istermal)) {
        printer = process.env.TERMAL_PRINTER;
        console.log("Printing to: ", printer);
      } else {
        printer = process.env.BASIC_PRINTER;

        let printer_name = await parts.fields.printer_name?.value;
        if (printer_name) {
          printer = printer_name;
        }

        console.log("Printing to: ", printer);
      }

      await pump(parts.file, fs.createWriteStream(fileToPrint));
      const options = {
        printer: printer,
        scale: "noscale",
      };
      try {
        await print(fileToPrint, options).then(console.log);
      } catch (error) {
        console.log(error);
      }
      console.log("Printed successfully to: ", printer);

      reply.send({
        message: `Printing your file to: ${printer}`,
      });
    }
  );
};
