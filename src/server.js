import express from "express";
const app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "ok", message: "everything is ok..." });
});

app.listen(3000, () => {
  console.log(`*** server is running on http://loacalhost:3000`);
});
