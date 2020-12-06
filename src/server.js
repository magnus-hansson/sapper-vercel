import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

function one(req, res, next) {
  req.hello = "world";
  next();
}

polka() // You can also use Express
  .get("/users/:id", (req, res) => {
    console.log(req.params.id);
    res.end(`User: ${req.params.id}`);
  })
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware(),
    one
  )

  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
