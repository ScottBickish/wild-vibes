import { ProxyState } from '../AppState.js'
import { audience, clientId, domain } from '../env.js'
import { AuthService } from '../Services/AuthService.js'
import { logger } from '../Utils/Logger.js'

function drawUser() {
  const user = ProxyState.user
  const userAvatar = avatarTemplate(user)
  const button = authButton(user)

  const template = /* html */ `
    ${userAvatar}
    ${button}
  `
  document.getElementById('authstate').innerHTML = template
}

function _drawAuthSettings() {
  const elem = document.getElementById('auth-settings')
  if (!elem) { return }
  elem.innerHTML = /* html */`
  <div class="card auth p-2 elevation-4">
    <div class="card-title auth p-2">
      <div class="d-flex align-items-center">
        <div class="avatar">
          <img src="https://avatars.githubusercontent.com/u/2824157?s=280&v=4" alt="user" height="45" class="rounded-circle">
        </div>
        <div class="text mx-2">
          <b>Auth0 Settings</b>
        </div>
      </div>
    </div>
    <div class="card-body border-top">
      <div class="text block"><b>Domain:</b> ${domain}</div>
      <div class="text block"><b>Audience:</b> ${audience}</div>
      <div class="text block"><b>Client Id:</b> ${clientId}</div>
    </div>
  </div>
`
}

export class AuthController {
  constructor() {
    ProxyState.on('user', drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, _drawAuthSettings)
    drawUser()
  }

  async login() {
    try {
      await AuthService.loginWithPopup()
    } catch (e) {
      logger.error(e)
    }
  }

  logout() {
    try {
      AuthService.logout()
    } catch (e) {
      logger.error(e)
    }
  }
}

function authButton(user) {
  if (AuthService.loading) { return '' }
  return user.isAuthenticated
    ? /* html */ `
    <button class="btn rounded-pill auth text-light text-muted" onclick="app.authController.logout()">✖</button>
  `
    : /* html */ `
    <button class="btn auth text-light m-3" onclick="app.authController.login()">Login</button>
  `
}

function avatarTemplate(user) {
  return user.isAuthenticated
    ? /* html */ `
    <div class="mr-2 d-flex rounded-pill auth me-1 align-items-center">
      <img class="rounded-circle ms-1" src="${user.picture}" alt="${user.name}" height="30"/>
      <span class="text-light text-center me-3 mb-2 m-2">${user.name}</span>
      </div>`
    : AuthService.loading
      ? /* html */ `
      <div class="skeleton-loader dark avatar"></div>
      <div class="skeleton-loader dark text sm mx-2"></div>`
      : /* html */`
      <div></div>
      `
}
