import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

// Connection URL
// const uri = "mongodb+srv://russ3:3Manziel3tex@cluster0.wigxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Database Name
// const dbName = 'mydb';

// //Post new cart item
// export async function postCartItem(item) {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('cart');

//   const insertItem = await collection.insertOne(item);

//   return insertItem;
// }

const uri = "mongodb+srv://russ3:mongo@cluster0.wigxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

