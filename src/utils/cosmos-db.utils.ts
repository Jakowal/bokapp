import { CosmosClient } from '@azure/cosmos';

export const testDBConnection = async () => {

  const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
  const key = process.env.REACT_APP_COSMOS_KEY;

// Set Database name and container name with unique timestamp
  const databaseName = 'ToDoList';
  const containerName = 'Items';

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
    const querySpec = {
      query: "SELECT * FROM c WHERE c.Tittel=@tittel",
      parameters: [
        {
          name: "@tittel",
          value: "Smak"
        }
      ]
    };

// Get items
    const { resources } = await container.items.query(querySpec).fetchAll();

    console.log(resources)
  }
}