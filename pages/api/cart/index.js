// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { cart } from '../../../data.js'
import { postCartItem, getCartItems } from '../../../lib/models'

export default function handler(req, res) {
  if(req.method === 'POST') {
    return postCartItem(req.body)
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch(console.error);
  }
}