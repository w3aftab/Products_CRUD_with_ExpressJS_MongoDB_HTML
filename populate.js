// default node modules
import dns from "dns";

// dependencies
import { config } from "dotenv";

// import local files
import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import jsonProducts from "./products.json" with { type: "json" };

// configuration
dns.setServers(["1.1.1.1", "1.0.0.1"]);
config();

// population process
connectDB()
  .then(async () => {
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Population uccess!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Population failed!", error);
    process.exit(1);
  });
