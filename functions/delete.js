const dynamo = require('../libs/dynamo')
const { success, failure } = require('../libs/responses')

export async function main (event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  try {
    await dynamo.call('delete', params)
    return success({ status: true })
  } catch (e) {
    return failure({ status: false })
  }
}
