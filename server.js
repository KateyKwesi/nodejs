import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/SendJSONResponse.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destionation = await getDataFromDB();

  const notFound = {
    error: "not found",
    message: "The requested route does not exist",
  };
  if (req.url === `/destination` && req.method === `GET`) {
    sendJSONResponse(res, 200, destionation);
  } else if (
    req.url.startsWith(`/destination/continent`) &&
    req.method === `GET`
  ) {
    const continent = req.url.split(`/`).pop();

    const filterByContinent = destionation.filter(
      (item) =>
        item.continent.toLocaleLowerCase() === continent.toLocaleLowerCase(),
    );
    if (filterByContinent.length === 0) {
      return sendJSONResponse(res, 404, notFound);
    }

    sendJSONResponse(res, 200, filterByContinent);
  } else {
    sendJSONResponse(res, 404, notFound);
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
