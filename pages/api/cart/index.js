// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { cart } from '../../../data.js'
import { postCartItem } from '../../../lib/models'

export default function handler(req, res) {
  if(req.method === 'POST') {
    return postCartItem(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch(console.error);
  }
}