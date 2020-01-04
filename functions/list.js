const dynamo = require('../libs/dynamo')
const { success, failure } = require('../libs/responses')

export async function main (event, context) {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  }

  try {
    const result = await dynamo.call('query', params)

    return success(result.Items)
  } catch (error) {
    console.error(error)
    return failure({ status: false })
  }
}
