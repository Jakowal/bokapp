import { AzureFunction, Context, HttpRequest } from "@azure/functions"
/*import {CosmosClient} from "@azure/cosmos";*/

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    /*const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
    const key = process.env.REACT_APP_COSMOS_KEY;

// Set Database name and container name with unique timestamp
    const databaseName = 'ToDoList';
    const containerName = 'Items';

    console.log(req);

    if (key && endpoint) {
        // Authenticate to Azure Cosmos DB
        const cosmosClient = new CosmosClient({
            endpoint,
            key,
        });

        const container = cosmosClient.database(databaseName).container(containerName);

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

        return resources.map(res => res.json());
    }*/
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;