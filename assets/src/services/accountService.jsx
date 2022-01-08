import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      'Content-Type': 'application/json'
    }
})

export function getAccount(token) {
    return instance.get(`api/v1/account?token=${token}`)
        .then(res => {return res})
}