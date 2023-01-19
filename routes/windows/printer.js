const { BasicMessage } = require("../../schema");
const { getPrinters, print } = require("pdf-to-printer");
// const fs = require("fs");
// const utils = require("util");
// const puppeteer = require("puppeteer");
// const hb = require("handlebars");
// const { encode } = require("querystring");
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
        //     consumes: ["multipart/form-data"],
        //     // body: {
        //     //   type: "object",
        //     //   properties: {
        //     //     printer_name: {
        //     //       type: "string",
        //     //     },
        //     //     media: {
        //     //       type: "string",
        //     //       format: "binary",
        //     //     },
        //     //   },
        //     // },
      },
    },
    async (request, reply) => {
      // IF CONSUME HTML AS INPUT
      // console.log("Compiing the template with handlebars");
      // // const template = hb.compile(request.body.html, { strict: true });
      // const template = hb.compile(request.body.html, { strict: true });
      // // we have compile our code with handlebars
      // const result = template(data);
      // // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
      // const html = result;
      // // we are using headless mode
      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();
      // // We set the page content as the generated html by handlebars
      // await page.setContent(html);
      // // we Use pdf function to generate the pdf in the same folder as this file.
      // await page.pdf({ path: "./testprint.pdf", format: "A4" });
      // await browser.close();
      // console.log("PDF Generated");

      // const printers = await getPrinters();
      // const media = request.body.media;
      // const printer = request.body.printer_name;
      const fileToPrint = "./filetoprint.pdf";
      // const printer = "HP_DeskJet_2300_series";
      const parts = await request.file();
      const istermal = (await parts.fields.istermal?.value) === "true";
      let printer = "";

      if (Boolean(istermal)) {
        // printer = "HP_Ink_Tank_Wireless_410_series";
        printer = process.env.TERMAL_PRINTER;
        console.log("Printing to: ", printer);
      } else {
        // printer = "HP_DeskJet_2300_series";
        printer = process.env.BASIC_PRINTER;

        let printer_name = await parts.fields.printer_name?.value;
        if (printer_name) {
          printer = printer_name;
        }
        console.log("Printing to: ", printer);
      }

      // `LOGING`
      // console.log("PARTS==================");
      // console.log(parts.file);
      // console.log(await parts);
      // console.log("ISTERMAL==================");
      // console.log(istermal);

      // `Windows PRINT`;
      // const options = ["-o landscape", "-o fit-to-page", "-o media=A4"];
      await pump(parts.file, fs.createWriteStream(fileToPrint));
      // printer = "HP_DeskJet_2300_series";
      const options = {
        printer: printer,
        scale: "noscale",
      };
      try {
        console.log(options);
        await print(fileToPrint, options).then(console.log);
      } catch (error) {
        // console.error();
        console.log(error);
      }
      console.log("Printed successfully to: ", printer);

      reply.send({
        message: `Printing your file to: ${printer}`,
      });
    }
  );
};
