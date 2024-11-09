import {
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  GetItemInput,
  GetItemOutput,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
// import { dynamodbClient } from "../database/dynamodb";

import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

import { DynamoDB } from "aws-sdk";

export const createTable = async () => {
  try {
    const command = new CreateTableCommand({
      TableName: "users", // Table name
      KeySchema: [
        { AttributeName: "userId", KeyType: "HASH" }, // Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: "userId", AttributeType: "S" }, // String type
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });

    const dynamodbClient = new DynamoDBClient({
      region: "eu-north-1", // Replace with your region
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const data = await dynamodbClient.send(command);
    console.log("Table created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

export const addItem = async () => {
  try {
    const command = new PutItemCommand({
      TableName: "users",
      Item: {
        userId: { S: "67891" },
        username: { S: "bvm" },
        email: { S: "isha@example.com" },
        password: { S: "securepassword" },
        phoneNumber: { S: "1234567890" },
      },
    });

    const dynamodbClient = new DynamoDBClient({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      logger: console,
    });

    const data = await dynamodbClient.send(command);

    console.log("Item added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

// addItem()

export const describeUserTable = async () => {
  try {
    const command = new DescribeTableCommand({
      TableName: "users",
    });

    const dynamodbClient = new DynamoDBClient({
      region: "eu-north-1", // Replace with your region
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const data = await dynamodbClient.send(command);

    return data.Table?.AttributeDefinitions;
  } catch (error) {
    console.error("Error describing table:", error);
  }
};

//get user by Id.
export const getUserTableData = async () => {
  const command = new GetCommand({
    TableName: "users",
    Key: {
      userId: "12345",
    },
    ProjectionExpression: "email ",
  });

  //   const client = new DynamoDBClient({});

  const dynamodbClient = new DynamoDBClient({
    region: "eu-north-1", // Replace with your region
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const docClient = DynamoDBDocumentClient.from(dynamodbClient);

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

export const updateUserData = async () => {
  const command = new UpdateCommand({
    TableName: "users",
    Key: {
      userId: "12345",
    },
    UpdateExpression: "set username = :username",
    ExpressionAttributeValues: {
      ":username": "isha1099",
    },
    ReturnValues: "ALL_NEW",
  });

  const dynamodbClient = new DynamoDBClient({
    region: "eu-north-1", // Replace with your region
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const response = await dynamodbClient.send(command);
  console.log(response);
  return response;
};

// getUserTableData();

// const getUserItemById = async () => {

//     try {

//         const ddb = new DynamoDB({ region: 'us-east-1', apiVersion: '2012-08-10' });

//         const params: GetItemInput = {
//             TableName: "users",  // Make sure TableName is a defined string
//             Key: {
//                 userId: { S: "12345" },    // Replace with the actual userId you're querying
//             },
//             ProjectionExpression: "#e, #p, phoneNumber",  // Using placeholders for reserved words like email and password
//             ExpressionAttributeNames: {
//                 "#e": "email",   // Define email placeholder
//                 "#p": "password" // Define password placeholder
//             },
//         };

//         // Perform the DynamoDB GetItem operation
//         const data: GetItemOutput = await ddb.getItem(params).promise();
//         console.log("Success", data.Item);
//         return data.Item;

//     } catch (error) {
//         throw error;
//     }

// }


// export const queryTheData = async () => {
//   const command = new QueryCommand({
//     TableName: "CoffeeCrop",
//     KeyConditionExpression:
//       "OriginCountry = :originCountry AND RoastDate > :roastDate",
//     ExpressionAttributeValues: {
//       ":originCountry": "Ethiopia",
//       ":roastDate": "2023-05-01",
//     },
//     ConsistentRead: true,
//   });

//   const dynamodbClient = new DynamoDBClient({
//     region: "eu-north-1", // Replace with your region
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     },
//   });

//   const response = await dynamodbClient.send(command);
//   console.log(response);
//   return response;
// };

export const deleteUserTable = async () => {
    const command = new DeleteTableCommand({
      TableName: "users",
    });

    
    const dynamodbClient = new DynamoDBClient({
        region: "eu-north-1", // Replace with your region
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });

    const response = await dynamodbClient.send(command);
    console.log(response);
    return response;
  };