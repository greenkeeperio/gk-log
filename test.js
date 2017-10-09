const assert = require('assert')
const Log = require('./index')

const accountId = '123test'
const repoSlug = 'testorg/testrepo'
const context = 'running-the-tests'
const testDb = {
  put: async (a) => {
    assert.equal(a.accountId, accountId, 'correct accountId found')
    assert.equal(a.repoSlug, repoSlug, 'correct repoSlug found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
    assert.equal(a.message, 'pizza', 'correct message found')
  }
}

const logger = Log({logsDb: testDb, accountId, repoSlug, context})
logger.info('pizza')

// logger is called with params
const params = {name: 'greenkeeper', occupation: 'bot'}
const test2Db = {
  put: async (a) => {
    assert.equal(a.accountId, accountId, 'correct accountId found')
    assert.equal(a.repoSlug, repoSlug, 'correct repoSlug found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
    assert.equal(a.message, 'pizza', 'correct message found')
    assert.deepEqual(a.params, params, 'correct params found')
  }
}

const logger2 = Log({logsDb: test2Db, accountId, repoSlug, context})
logger2.info('pizza', params)

// logger is called without a message
const test3Db = {
  put: async (a) => {
    assert.equal(a.accountId, accountId, 'correct accountId found')
    assert.equal(a.repoSlug, repoSlug, 'correct repoSlug found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
    assert.equal(a.message, 'no message specified', 'correct message found')
  }
}

const logger3 = Log({logsDb: test3Db, accountId, repoSlug, context})
logger3.info()

// logger converts repoSlug to lower case
const test4Db = {
  put: async (a) => {
    assert.equal(a.accountId, accountId, 'correct accountId found')
    assert.equal(a.repoSlug, repoSlug, 'correct repoSlug found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
    assert.equal(a.message, 'no message specified', 'correct message found')
  }
}

const logger4 = Log({logsDb: test4Db, accountId, repoSlug: 'TestOrg/TestRepo', context})
logger4.info()
