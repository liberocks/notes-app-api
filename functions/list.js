const dynamo = require('../libs/dynamodb-lib')
const { success, failure } = require('../libs/response-lib')

export async function main (event, context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  }

  try {
    const result = await dynamo.query(params)

    return success(result.Items)
  } catch (error) {
    console.error(error)
    return failure({ status: false })
  }
}
