module.exports = function Log({logsDb, accountId, repoSlug, context}) {
  const log = (type, message = 'no message specified', params) => {
    let date = new Date()
    const shortDate = date.toISOString().replace(/[-,:]/g,'').replace('T', '-').split('.')[0]
    const randomString = Math.ceil(Math.random(1)*1000000)
    const repoSlugIfExists = repoSlug ? repoSlug + ':' : ''
    const accountIdIfExists = accountId ? accountId + ':' : ''

    const logDoc = {
      _id: `${accountIdIfExists}${repoSlugIfExists}${type}:${context}:${shortDate}:${randomString}`,
      accountId,
      repoSlug: repoSlug ? repoSlug.toLowerCase() : '',
      context,
      type,
      message,
      params,
      createdAt: date.toISOString()
    }

    if (process.env.GK_DEBUG) {
      console.log(logDoc)
    }

    logsDb.put(logDoc).catch(err => { throw err })
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
