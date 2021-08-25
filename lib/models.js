import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'


const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export function postCartItem(item) {
  return client.connect()
    .then((response) => {
      // console.log('Connected to mongoDB')
    })
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      return collection.insertOne(item)
    })
    .then((data) => {
      client.close()
      return data;
    })
    .catch((err) => err);
}

export function removeCartItem(id) {
  return client.connect()
  .then((response) => {
    // console.log('Connected to mongoDB', response)
    const collection = client.db("mydb").collection("cart");
    return collection.deleteOne({'_id': ObjectId(`${id}`)})
  })
  .then((response) => {
    client.close()
    return response;
  })
  .catch((err) => {
    return err
  });
}

export function getCartItems(user) {
  return client.connect()
    .then((response) => {
      // console.log('Connected to mongoDB')
    })
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      const query = {email: user}
      return collection.find(query).toArray()
    })
    .then((data) => {
      client.close()
      return data;
    })
    .catch((err) => err);
}

