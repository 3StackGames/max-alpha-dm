import { API_URL } from '../../.env'

export default class APICall {
  constructor(endpoint = '/', action = 'GET', json = true) {
    const xhr = new XMLHttpRequest()
    xhr.open(action, API_URL+endpoint)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    this.xhr = xhr
    this.json = json
  }

  run(params = [], callback = null) {
    const xhr = this.xhr
    xhr.onreadystatechange = () => {
      if (xhr.readyState != XMLHttpRequest.DONE) {
        return
      }

      const res = this.json ? JSON.parse(xhr.responseText) : null
      callback(res)
    }
    xhr.send(JSON.stringify(params))
  }
}