import AWS from 'aws-sdk'

export function put (params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.put(params).promise()
}

export function get (params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.get(params).promise()
}