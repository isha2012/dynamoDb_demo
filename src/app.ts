import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { listTables } from './models/listTables';
import { addItem, createTable, deleteUserTable, describeUserTable, getUserTableData, updateUserData } from './models/userTable';

dotenv.config();
// import dynamoDb from './dynamodbClient';
// import listTables from '../src/models/userTable'
const app: Application = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(express.json());

// import AWS from 'aws-sdk';



// const dynamoDb =  new AWS.DynamoDB();;

app.get('/', async (req, res)=> {
    const getData = await deleteUserTable();

    console.log("#################", getData);
    

    return res.json(getData);
})
  


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// console.log(listTables)
