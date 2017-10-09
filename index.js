module.exports = function Log({logsDb, accountId, repoSlug, context}) {
  const log = (type, message = 'no message specified', params) => {
    let date = new Date()
    const shortDate = date.toISOString().replace(/[-,:]/g,'').replace('T', '-').split('.')[0]
    const randomString = Math.ceil(Math.random(1)*1000000)
    logsDb.put({
      _id: `${accountId}:${repoSlug}:${type}:${context}:${shortDate}:${randomString}`,
      accountId,
      repoSlug,
      context,
      type,
      message,
      params,
      createdAt: date.toISOString()
    })
    .catch(err => console.log(err))
  }

  return {
    info: (message, params) => {
      log('info', message, params)
    },
    success: (message, params) => {
      log('success', message, params)
    },
    warn: (message, params) => {
      log('warn', message, params)
    },
    error: (message, params) => {
      log('error', message, params)
    }
  }
}
