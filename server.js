import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/SendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";
import { getDataBySearchParams } from "./utils/getDataBySearchParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destionation = await getDataFromDB();

  const notFound = {
    error: "not found",
    message: "The requested route does not exist",
  };

  const requrl = new URL(req.url, `http://${req.headers.host}`);

  let urlobj = Object.fromEntries(requrl.searchParams);

  if (requrl.pathname === `/api` && req.method === `GET`) {
    let filteredData = getDataBySearchParams(destionation, urlobj);

    sendJSONResponse(res, 200, filteredData);
  } else if (req.url.startsWith(`/api/continent`) && req.method === `GET`) {
    const continent = req.url.split(`/`).pop();

    const data = getDataByPathParams(destionation, `continent`, continent);

    sendJSONResponse(res, 200, data);
  } else if (req.url.startsWith(`/api/country`) && req.method === `GET`) {
    const country = req.url.split(`/`).pop();

    const data = getDataByPathParams(destionation, `country`, country);

    sendJSONResponse(res, 200, data);
  } else {
    sendJSONResponse(res, 404, notFound);
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
