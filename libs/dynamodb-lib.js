import AWS from 'aws-sdk'

export function put (params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.put(params).promise()
}

export function get (params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.get(params).promise()
}

export function query (params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.query(params).promise()
}

export function update (params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.update(params).promise()
}
