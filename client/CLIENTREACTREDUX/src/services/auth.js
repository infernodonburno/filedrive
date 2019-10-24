<<<<<<< HEAD
export const Authorization =
  'Bearer eyJraWQiOiJpZXA2dmZuSTJGWVN5VDFBS3Z1ZENsRjhfWDh0MFRFT2VvREQtcTFyYXNJIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmlMeVdRTk5vZHR1Y3JWeFAzOXl1UEZHMTcyX0JtczBXanJSamNYckdJTVUiLCJpc3MiOiJodHRwczovL2Rldi0yMDUwNzMub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNTcxOTM3MjYzLCJleHAiOjE1NzE5NDA4NjMsImNpZCI6IjBvYTFtdTUxNzREWXVMSGpNMzU3IiwidWlkIjoiMDB1MW1yeTFlMzdFQ0lTeGEzNTciLCJzY3AiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIl0sInN1YiI6ImZpbGVkcml2ZXByb2plY3Rjb29rc3lzQGdtYWlsLmNvbSJ9.KVbFzHx5yQGmNOqy7ehK9CowFpBdy45ohhYhLZ2Xnk7dCNCDem0lPkG5Mbkb4NPsVporHErq3h7u0Kf-CoUhVBKKsp6i9RmZY8hZtdsok4shNcPfE7zD3YJ3p_K_nlzsCt8LPRSbkzRCOSQV56NLSA8gpqKAq7r3aP4h9dPZ53U7DIoa0R4Bbqo7TJds3-tlrpif8zhl923y9g4uBQKj7QfbJ0sT0SZIgBGJ0Veldi_J7_53pWX2kExElJfE4KEy_F-0n6D9WsseUI-k2ErwIrJh_5dyXmUep_EgEumpx-9Rv2AXf1Q8XPWZyMRGJB-GTK-ViKad1Q5yHvGdlNa5sg'
=======
// import { getAuthToken } from './api'
// import { getAuthEmail } from './api'
>>>>>>> 1dcf3923f1208a2a90e586aadbf9ce12470adfa0

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
