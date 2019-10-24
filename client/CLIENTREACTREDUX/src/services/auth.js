// import { getAuthToken } from './api'
// import { getAuthEmail } from './api'

function getAuthToken () {
  const okta = localStorage.getItem('okta-token-storage')
  const obj = JSON.parse(okta)

  let token = obj.accessToken.accessToken

  return token
}
function getAuthEmail () {
  const okta = localStorage.getItem('okta-token-storage')
  const obj = JSON.parse(okta)

  let email = obj.idToken.claims.email

  return email
}

console.log('THIS SHOULD BE THE TOKEN: ', getAuthToken())

export const Authorization = `Bearer ${getAuthToken()}`

export const username = `${getAuthEmail()}`
