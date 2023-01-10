const { BasicMessage } = require("../../schema");
const { getPrinters, print } = require("pdf-to-printer");
// const fs = require("fs");
// const utils = require("util");
const puppeteer = require("puppeteer");
const hb = require("handlebars");
const fs = require("fs");
const { encode } = require("querystring");

const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

module.exports = async (fastify, options) => {
  fastify.get(
    "/listprinter",
    {
      schema: {
        description: "Health test",
        tags: ["Printer"],
        summary: "test",
        // response: {
        //   200: { ...BasicMessage, description: "Successful response" },
        //   500: { ...BasicMessage, description: "Failed response" },
        // },
      },
    },
    async (request, reply) => {
      printers = await getPrinters();

      reply.send({
        message: printers,
      });
    }
  );
  fastify.post(
    "/print",
    {
      schema: {
        description: "Print",
        tags: ["Printer"],
        summary: "Print",
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

      printers = await getPrinters();
      // const media = request.body.media;
      // const printer = request.body.printer_name;
      const fileToPrint = "./testprint.png";
      // const printer = "HP_DeskJet_2300_series";
      const parts = await request.file();
      const istermal = (await parts.fields.istermal?.value) === "true";
      let printer = "";
      if (Boolean(istermal)) {
        // printer = "HP_Ink_Tank_Wireless_410_series";
        printer = printers[1].printer;
        console.log(printer);
      } else {
        // printer = "HP_DeskJet_2300_series";
        printer = printers[0].printer;

        let printer_name = await parts.fields.printer_name?.value;
        if (printer_name) {
          printer = printer_name;
        }
        console.log(printer);
      }

      // `LOGING`
      console.log("PARTS==================");
      // console.log(await parts);
      console.log("ISTERMAL==================");
      console.log(istermal);
      // console.log("==================BODYYY");
      // console.log(request.body.printer_name);
      // console.log(request.body.media);
      // console.log(request.__files__);

      // `LOOPING`
      // for await (const part of parts) {
      //   console.log("------------>no");
      //   console.log(part.fields);
      //   if (part.file) {
      //     // upload and save the file
      //     await pump(part.file, fs.createWriteStream(fileToPrint));
      //   } else {
      //     // do something with the non-files parts
      //     console.log(";;;;;;;;;;;;;;;;;NOOOO FILES;;;;;;;;;;;;;;;;");
      //   }
      // }
      // fs.writeFileSync(fileToPrint, media, {
      //   encoding: null,
      // });

      // `UNIX PRINT`;
      // const options = ["-o landscape", "-o fit-to-page", "-o media=A4"];
      await pump(parts.file, fs.createWriteStream(fileToPrint));
      print(fileToPrint, printer).then(console.log);

      reply.send({
        message: "Printing your file",
      });
    }
  );
};
