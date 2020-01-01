const dynamo = require('./libs/dynamodb-lib')
const { success, failure } = require('./libs/response-lib')

export async function main (event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamo.get(params)

    if (result.Item) return success(result.Item)
    else return failure({ status: false, error: 'Item not found.' })
  } catch (error) {
    console.error(error)
    return failure({ status: false })
  }
}
