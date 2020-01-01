const uuid = require('uuid')
const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export async function main (event, context, callback) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  }

  // Set response headers to enable CORS (Cross-Origin Resource Sharing)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }

  let response = {}
  try {
    await dynamoDb.put(params).promise()
    response = params.Item
  } catch (error) {
    console.log(error)

    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ status: false })
    }
  }

  callback(null, response)
}
