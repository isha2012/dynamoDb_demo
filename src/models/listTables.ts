import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
// import { dynamodbClient } from '../database/dynamodb';




export const listTables = async () => {
    try {
      console.log("Starting to list tables...");
        // console.log(process.env.AWS_SECRET_ACCESS_KEY!)
        // console.log(process.env.AWS_ACCESS_KEY_ID!)


      const command = new ListTablesCommand({});

      const Client = new DynamoDBClient({
        region: 'us-east-1', // Replace with your region
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
        }
    });
    
      const data = await Client.send(command);
        return data;
      console.log("DynamoDB response received...");
      console.log('Tables in DynamoDB:', data);
    } catch (error) {
      console.error('Error listing tables:', error);
    }
  };

console.log(listTables);