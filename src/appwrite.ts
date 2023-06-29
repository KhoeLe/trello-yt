import { Account, Client, Databases,Storage , ID} from "appwrite";

const client  =  new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('649a96438695712b7533')

const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)


export { client, account, databases, storage, ID};
