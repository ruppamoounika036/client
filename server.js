const express = require("express")
// const app = express()
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;
// const mongoose = require('mongoose');
// const express = require('express')
// const next = require('next')
// const { createProxyMiddleware } = require("http-proxy-middleware")

// const port = process.env.PORT || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const apiPaths = {
//     '/api': {
//         target: 'http://localhost:5000', 
//         pathRewrite: {
//             '^/api': '/api'
//         },
//         changeOrigin: true
//     }
// }

// const isDevelopment = process.env.NODE_ENV !== 'production'

// app.prepare().then(() => {
//   const server = express()
 
//   if (isDevelopment) {
//     server.use('/api', createProxyMiddleware(apiPaths['/api']));
//   }

//   server.all('*', (req, res) => {
//     return handle(req, res)
//   })

//   server.listen(port, (err) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// }).catch(err => {
//     console.log('Error:::::', err)
// })


const {MongoClient} = require('mongodb');
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
 

async function main(){
    const uri ="mongodb+srv://ruppamounika:Mounika@cluster0.9bs3pso.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);
    // try{
        app.use(bodyParser.json());
         client.connect();
        app.get("/",async (req,res)=>{ 
        const games =await findOneListingByName(client);
        console.log(games);
        res.send(games);
        })
        // await deleteListingByName(client,'Js-Planet');
        await findOneListingByName(client)

        // console.log(games);
        // await createListing(client,{
        //         name:"Js-Planet",
        //         url : "https://shots.codepen.io/Loopez10/pen/dMaVdQ-800.jpg?version=1662365854",
        //         pagepath: "/jsPlanet"
        //     })
    // } catch(e) {
    //     console.error(e);
    // } finally {
    //     await client.close();
    }


 main().catch(console.error);


 async function createListing(client, newListing){
    const result = await client.db("GamingDb").collection("games").insertOne(newListing);
    console.log(`New Listing created with the following id: ${result.insertedId}`);
 }

async function deleteListingByName(client,nameOfListing){
   await client.db("GamingDb").collection("games").deleteMany({name:nameOfListing});
   console.log("in delete")

}


 async function findOneListingByName(client,nameOfListing){
    const result = await client.db("GamingDb").collection("games").find({}).toArray();
    if(result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listing found with the name '${nameOfListing}'`);
    }
    return result;
}

app.listen(port);
