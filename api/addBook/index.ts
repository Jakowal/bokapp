import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {CosmosClient} from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : 'true', // Needed for cookies, authorization headers with HTTPS
            'Access-Control-Allow-Origin' : process.env.REACT_APP_LOCAL ? 'http://localhost:3000' : 'https://orange-smoke-0ea5f2d03.3.azurestaticapps.net', // Allow from this origin
            'Access-Control-Allow-Methods' : 'POST', // Allow these verbs
            'Access-Control-Allow-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept, x-tenant-id'
        },
    }

    const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
    const key = process.env.REACT_APP_COSMOS_KEY;

    // Set Database name and container name
    const databaseName = process.env.REACT_APP_COSMOS_DB;
    const containerName = process.env.REACT_APP_COSMOS_CONTAINER;

    const item = req.body;

    if (key && endpoint && item) {
        // Authenticate to Azure Cosmos DB
        const cosmosClient = new CosmosClient({
            endpoint,
            key,
        });

        const container = cosmosClient.database(databaseName).container(containerName);

        // Get items
        const { resource } = await container.items.create(item);

        context.res = {
            ...context.res,
            body: JSON.stringify(resource),
        }
    }
};

export default httpTrigger;