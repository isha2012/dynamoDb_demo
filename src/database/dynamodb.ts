import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Configure AWS SDK
export const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1', // Replace with your region
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});
