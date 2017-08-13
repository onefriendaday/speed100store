import ajax from 'axios'

export default function() {
  return ajax.create({
    baseURL: 'https://api.storeblok.com/v1/',
    headers: {
      'Authorization': 'Token token=' + CheckoutToken
    }
  })
}
