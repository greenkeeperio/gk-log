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

// logger is initialized with a repoSlug
const test5Db = {
  put: async (a) => {
    const expectedIdPartial = '123test:testorg/testrepo:info:running-the-tests:'
    assert.ok(a._id.match(expectedIdPartial), 'correct id found')
    assert.equal(a.accountId, accountId, 'correct accountId found')
    assert.equal(a.repoSlug, repoSlug, 'correct repoSlug found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
  }
}

const logger5 = Log({logsDb: test5Db, repoSlug, accountId, context})
logger5.info('test')

// logger is initialized without a repoSlug
const test6Db = {
  put: async (a) => {
    const expectedIdPartial = '123test:info:running-the-tests:'
    assert.ok(a._id.match(expectedIdPartial), 'correct id found')
    assert.equal(a.accountId, accountId, 'correct accountId found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
  }
}

const logger6 = Log({logsDb: test6Db, accountId, context})
logger6.info('test')

// logger is initialized without an accountId
const test7Db = {
  put: async (a) => {
    const expectedIdPartial = 'testorg/testrepo:info:running-the-tests:'
    assert.ok(a._id.match(expectedIdPartial), 'correct id found')
    assert.equal(a.repoSlug, repoSlug, 'correct repoSlug found')
    assert.equal(a.context, context, 'correct context found')
    assert.equal(a.type, 'info', 'correct type found')
  }
}

const logger7 = Log({logsDb: test7Db, repoSlug, context})
logger7.info('test')
