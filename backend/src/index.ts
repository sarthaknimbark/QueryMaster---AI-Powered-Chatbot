import app from "./app.js";
import { connectToDatabase, disconnectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT,() => 
      console.log("Server is Livee and Connected to Database...")
    );
  })
  .catch((err) => 
    console.log(err));

