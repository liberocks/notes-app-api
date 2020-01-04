const dynamo = require('../libs/dynamo')
const { success, failure } = require('../libs/responses')
const uuid = require('uuid')

export async function main (event, context) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  }

  try {
    await dynamo.call('put', params)
    return success(params.Item)
  } catch (error) {
    console.error(error)
    return failure({ status: false })
  }
}
