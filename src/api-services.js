import config from './config'

const APIService = {

getAccountByEmail(email) {

return fetch(`${config.API_ENDPOINT}/account/email/${email}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
},

createAccount(account) {
    return fetch(`${config.API_ENDPOINT}/account`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(account),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
 },

 createProject(project){
    return fetch(`${config.API_ENDPOINT}/project`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(project),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
 },

 postTask(task){

    return fetch(`${config.API_ENDPOINT}/task`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(task),
    })
        .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        return res.json()
        })
        .then(task => {
        console.log("posted task to db: " + JSON.stringify(task))
        })
        .catch(error => {
        console.error({ error })
        })
},

createUserPrefs(pref){
  return fetch(`${config.API_ENDPOINT}/pref`, {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify(pref),
  })
      .then(res => {
      if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      return res.json()
      })
      
},

saveUserPrefs(prefs, account_id){
  return fetch(`${config.API_ENDPOINT}/account/${account_id}`, {
      method: 'PATCH',
      headers: {
      'content-type': 'application/json'
      },
      body: JSON.stringify(prefs),
  })
      .then(res => {
      if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      return res.json()
      })
      
}



}

export default APIService
