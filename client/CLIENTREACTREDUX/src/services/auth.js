// import { getAuthToken } from './api'
// import { getAuthEmail } from './api'

function getAuthToken () {
  const okta = localStorage.getItem('okta-token-storage')

  if (okta === null) {
    let accessToken = { accessToken: null }
    return accessToken
  }
  const obj = JSON.parse(okta)

  let token = obj.accessToken.accessToken

  return token
}
function getAuthEmail () {
  const okta = localStorage.getItem('okta-token-storage')

  if (okta === null) {
    let accessToken = { idToken: { claims: { email: null } } }
    return accessToken
  }
  const obj = JSON.parse(okta)

  let email = obj.idToken.claims.email

  return email
}

export const Authorization = `Bearer ${getAuthToken()}`

export const username = `${getAuthEmail()}`
