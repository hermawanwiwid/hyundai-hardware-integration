# Hyundai Hardware Integration
This is a microservice for hardware integration related to Hyundai project

## How to install the apps

For production:

- Go to the project directory root
- change the env variable with the printer name
  - TERMAL_PRINTER="PRINTER_NAME_TERMAL"
  - BASIC_PRINTER="PRINTER_NAME_BASIC"
- Run `npm i`
- Run `npm install pm2 -g`
- Run `pm2 start app.js`
- Your apps is running!

> **Note**\
> If you don't have any idea about the printer name:
> - Run the app without env variable edited
> - Open [http://localhost:5000](http://localhost:5000/api/docs/static/index.html#/Printer/get_api_windows_listprinter) in the browser.
> - Execute `GET /api/windows/listprinter` to get the list of printer installed on your machine
-----------
To start the app in dev mode:
- Go to the project directory root
- Run `npm i`
- Run  `npm run dev`
- Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
