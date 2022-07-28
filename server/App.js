const express = require("express");
const app = express();
const PORT = 1357;
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schemas/schema");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const userRoutes = require("./routes");
app.use(userRoutes);

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on ${PORT}`);
});
