const dynamo = require('../libs/dynamo')
const { success, failure } = require('../libs/responses')

export async function main (event, context) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
      ':updatedAt': Date.now()
    },
    ReturnValues: 'ALL_NEW'
  }

  try {
    await dynamo.call('update', params)
    return success({ status: true })
  } catch (error) {
    console.error(error)
    return failure({ status: false })
  }
}
