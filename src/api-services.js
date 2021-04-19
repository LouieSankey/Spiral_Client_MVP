import config from './config'
const token = localStorage.getItem("spiral_jwt_token")
const account = localStorage.getItem('account_id')


const APIService = {

getAccountByEmail(credentials) {

return fetch(`${config.API_ENDPOINT}/account/email/${credentials.email}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(credentials),
  }).then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
},

// getAccountById(id) {

//   return fetch(`${config.API_ENDPOINT}/account/${id}`, {
//       method: 'GET',
//       headers: {
//         'content-type': 'application/json'
//         `Authorization': 'Bearer ${token}`
//       },
//       body: JSON.stringify(credentials),
//     }).then(res => {
//         if (!res.ok)
//           return res.json().then(e => Promise.reject(e))
//         return res.json()
//       })
//   },

getProjectTasksForRange(params) {

  return fetch(`${config.API_ENDPOINT}/task/account/${params.account}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params),
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
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(account),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
 },

 createProject(project, token = localStorage.getItem("spiral_jwt_token")){
    return fetch(`${config.API_ENDPOINT}/project`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
 },

 deleteProject(project_id){

  return fetch(`${config.API_ENDPOINT}/project/${project_id}/${account}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return ""
      })
},

deleteTask(task_id){

  return fetch(`${config.API_ENDPOINT}/task/${task_id}/${account}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return ""
      }).catch(error => {
        console.error({ error })
        })
},

 postTask(task){

    return fetch(`${config.API_ENDPOINT}/task`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
    })
        .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        return res.json()
        })
        .catch(error => {
        console.error({ error })
        })
},

createUserPrefs(pref, token = localStorage.getItem("spiral_jwt_token")){
  return fetch(`${config.API_ENDPOINT}/pref`, {
      method: 'POST',
      headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
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

  return fetch(`${config.API_ENDPOINT}/pref/account/${account_id}`, {
      method: 'PATCH',
      headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(prefs),
  })
      .then(res => {
      if (!res.ok){
          return res.json().then(e => Promise.reject(e))
      }

      return res.json()
      })
      
}





}

export default APIService
