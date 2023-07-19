import { CosmosClient } from '@azure/cosmos';
import {BookModel, BookModelFieldTranslationsFromNorwegian} from "../models/BookModel";

export const transformServerResponse = (response: any[]): BookModel[] => response.map(entry => {
  const transformedObject: any = {};
  Object.entries(entry).map(value => transformedObject[BookModelFieldTranslationsFromNorwegian[value[0]]] = value[1])
  return transformedObject;
});

export const searchBookByTitle = async (title: string): Promise<any> => {

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
    const querySpec = title ? {
      query: "SELECT * FROM c WHERE c.Tittel=@tittel",
      parameters: [
        {
          name: "@tittel",
          value: title
        }
      ]
    } : {
      query: "SELECT TOP 10 * FROM c",
    };

// Get items
    const { resources } = await container.items.query(querySpec).fetchAll();

    return resources;
  }
}