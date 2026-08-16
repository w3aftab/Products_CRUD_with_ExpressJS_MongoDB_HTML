import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import path from "path";
import connectDB from "./config/db.js";
import productsRoute from "./routes/productsRoutes.js";

dotenv.config();
dns.setServers(["1.1.1.1", "1.0.0.1"]);
const PORT = process.env.PORT || 5000;

const app = express();
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

/* STATIC FOLDER
* app.use(express.static('public'));
load the files that are in the public directory:
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/hello.html

* app.use('/static', express.static('public'));
load the files that are in the public directory from the /static path prefix.
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/hello.html

* However, the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use("/static", express.static(path.join(__dirname, "public")));
 
*/
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors());
app.use("/api/v1/products", productsRoute);

// HTML FILES
const routesHTML = async (...pageNames) => {
  try {
    await pageNames.map((pageName) => {
      const pageUrl = path.join(
        import.meta.dirname,
        "public",
        `${pageName}.html`,
      );
      app.get(`/${pageName}`, (req, res) => res.sendFile(pageUrl));
      app.get(`/${pageName}/:id`, (req, res) => res.sendFile(pageUrl));
    });
  } catch (error) {
    console.error("Name not found!");
  }
  // res.redirect("/details.html");
};
routesHTML("index", "details", "test", "others");

app.all("/*path", (req, res) => {
  res.status(404).send("404, not found!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server runnig on port: ${PORT}...`);
  });
});
