import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {CosmosClient} from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : 'true', // Needed for cookies, authorization headers with HTTPS
            'Access-Control-Allow-Origin' : process.env.REACT_APP_LOCAL ? 'http://localhost:3000' : 'https://orange-smoke-0ea5f2d03.3.azurestaticapps.net', // Allow from this origin
            'Access-Control-Allow-Methods' : 'GET', // Allow these verbs
            'Access-Control-Allow-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
        },
    }

    const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
    const key = process.env.REACT_APP_COSMOS_KEY;

    // Set Database name and container name
    const databaseName = process.env.REACT_APP_COSMOS_DB;
    const containerName = process.env.REACT_APP_COSMOS_CONTAINER;

    if (key && endpoint) {
        // Authenticate to Azure Cosmos DB
        const cosmosClient = new CosmosClient({
            endpoint,
            key,
        });

        const container = cosmosClient.database(databaseName).container(containerName);

        const parameters = []

        const query = Object.entries(req.query).map(([field, value], index) => {
            parameters.push({
                name: `@${field}`,
                value: `%${value}%`
            })
            return index > 0 ? `AND UPPER(c.${field}) LIKE UPPER(@${field})` : `UPPER(c.${field}) LIKE UPPER(@${field})`;
        });

        const querySpec = query ? {
            query: `SELECT * FROM c WHERE ${query.join(' ')}`,
            parameters: parameters,
        } : {
            query: "SELECT TOP 10 * FROM c",
        }

        // Get items
        const { resources } = await container.items.query(querySpec).fetchAll();

        context.res = {
            ...context.res,
            body: JSON.stringify(resources),
        }
    }
};

export default httpTrigger;