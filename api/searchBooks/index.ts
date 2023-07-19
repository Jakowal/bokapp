import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {CosmosClient} from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    context.res = {
        ...context.res,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : 'true', // Needed for cookies, authorization headers with HTTPS
            'Access-Control-Allow-Origin' : 'http://localhost:3000', // Allow from this origin
            'Access-Control-Allow-Methods' : 'GET,POST', // Allow these verbs
            'Access-Control-Allow-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
        },
    }

    const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
    const key = process.env.REACT_APP_COSMOS_KEY;

    console.log('connecting to:' + endpoint)

    // Set Database name and container name
    const databaseName = 'ToDoList';
    const containerName = 'Items';

    if (key && endpoint) {
        // Authenticate to Azure Cosmos DB
        const cosmosClient = new CosmosClient({
            endpoint,
            key,
        });

        const container = cosmosClient.database(databaseName).container(containerName);

        console.log('found container')

        // Read item by id and partitionKey - least expensive `find`
        // Query by SQL - more expensive `find`
        // find all items with same categoryId (partitionKey)
        const querySpec = req.query.title ? {
            query: "SELECT * FROM c WHERE c.Tittel=@tittel",
            parameters: [
                {
                    name: "@tittel",
                    value: req.query.title
                }
            ]
        } : {
            query: "SELECT TOP 10 * FROM c",
        };

        // Get items
        const { resources } = await container.items.query(querySpec).fetchAll();

        console.log('Fetched' + resources)

        return resources;
    }
};

export default httpTrigger;