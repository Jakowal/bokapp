import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {CosmosClient} from "@azure/cosmos";

const fieldTranslations: {[key: string]: string } = {
    id: 'boknummer',
    authorLastName: 'Forfatter etternavn',
    authorFirstName: 'Forfatter fornavn',
    title: 'Tittel',
    price: 'Pris',
    condition: 'Tilstand',
    totalprice: 'Totalpris',
    sold: 'Solgt',
    category: 'Kategori',
    subtitle: 'Undertittel',
    soldFor: 'Solgt for',
    soldTo: 'Solgt til',
    catalogueNumber: 'Katalog nr.',
    catalogueBookNumber: 'katalogboknummer',
    saleDate: 'Salgsdato',
    catalogueEntry: 'kataloginnskrift',
    newCatalogueEntry: 'Ny kataloginnskrift',
    string: 'Streng',
    comma: 'Komma',
    colon: 'Kolon',
    authorEntry: 'Forfatterinnskrift',
    publishedPlace: 'Utgivelsessted',
    publishedYear: 'Utgivelsesår',
    totalNumberPublished: 'Antall eks.',
    subCategory: 'Underkategori',
    firstLetter: 'Forbokstav',
    fulAuthorName: 'Fult forfatternavn',
    catalogueEntrySubNumber: 'Kataloginnskrift u nr',
    comment: 'Kommentar',
    boughtFor: 'Kjøpt for',
    amountBoughtFor: 'Sum kjøpt for',
    edition: 'Utgave',
    numberOfBooks: 'Antall verk',
    gainOrLoss: 'Gevinst eller tap',
    gainOrLossTotal: 'Sum gevinst eller tap',
    purchaseDate: 'Kjøpsdato',
    registeredDate: 'Registreringsdato',
    alternateName: 'Alternativt navn',
    placeReference: 'Plassreferanse',
    format: 'Format',
    binding: 'Innbinding',
    pageCount: 'Sideantall',
    soldStatisticsName: 'Solgtstatistikknavn',
    totalPageCount: 'Sum sideantall',
    firstEditionTest: 'Førsteutgavetest',
    totalFirstEditionCount: 'Sum av førsteutgaver',
    categoryShortName: 'Kortnavn kategori',
    categoryNumber: 'kategorisorteringsnummer',
    catalogueEntryShort: 'kataloginnskrift kort',
    soldText: 'Solgttekst',
    nameSorting: 'Navnesortering',
    store: 'Antikvariat',
    firstLetterCategory: 'Forbokstav kategori',
    catalogueEntryShortSubPlace: 'kataloginnskrift kort u plass',
    todaysDate: 'd dato',
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {

    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : 'true', // Needed for cookies, authorization headers with HTTPS
            'Access-Control-Allow-Origin' : 'https://orange-smoke-0ea5f2d03.3.azurestaticapps.net', // Allow from this origin
            'Access-Control-Allow-Methods' : 'GET,POST', // Allow these verbs
            'Access-Control-Allow-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
        },
    }

    const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
    const key = process.env.REACT_APP_COSMOS_KEY;

    console.trace(req)

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

        console.trace(container)

        const [field, value] = Object.entries(req.query)[0];
        console.log({
            name: `@${field}`,
            value: value
        })

        const querySpec = field && value ? {
            query: `SELECT * FROM c WHERE c["${fieldTranslations[field]}"] LIKE @${field}`,
            parameters: [
                {
                    name: `@${field}`,
                    value: `%${value}%`
                }
            ]
        } : {
            query: "SELECT TOP 10 * FROM c",
        };

        console.trace(querySpec)

        // Get items
        const { resources } = await container.items.query(querySpec).fetchAll();

        console.trace(resources)

        context.res = {
            ...context.res,
            body: resources,
        }

        return JSON.stringify(resources);
    }
};

export default httpTrigger;