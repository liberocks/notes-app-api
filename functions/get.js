const dynamo = require('../libs/dynamo')
const { success, failure } = require('../libs/responses')

export async function main (event, context) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamo.call('get', params)

    if (result.Item) return success(result.Item)
    else return failure({ status: false, error: 'Item not found.' })
  } catch (error) {
    console.error(error)
    return failure({ status: false })
  }
}
