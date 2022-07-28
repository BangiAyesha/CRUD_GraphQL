import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetUsers from "./components/GetUsers";
import Register from "./components/Register";
import Login from "./components/Login";

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`GraphQL Error ${message}`);
        });
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:1357/graphql" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<GetUsers />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
