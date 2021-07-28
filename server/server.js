const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node'); 
var cors = require('cors');

 
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// app.post('/refresh',(req, res) =>{
//     const refreshToken = req.body.refreshToken
//     console.log(refreshToken)
//     const spotifyApi=  new SpotifyWebApi({
//         redirectUri:'http://localhost:3000',
//         clientId:'411f889e99bd40ecaecc7f4e44ee3cd5',
//         clientSecret:'56550b14a86c46398f7314a946c1a286',
//         refreshToken,
//     })


//  spotifyApi.refreshAccessToken().then(
//     (data) => {
//       res.json({
//           accessToken: data.body.accessToken,   
//           expiresIn:data.body.expiresIn,
//       })
  
      
//       spotifyApi.setAccessToken(data.body['access_token']);
//     })
//     .catch(()=>{
//         res.sendStatus(400)
//     })
 
// })


app.post('/login', (req, res) => {
    var code = req.body.code
 const spotifyApi=  new SpotifyWebApi({
        redirectUri:'http://localhost:3000',
        clientId:'411f889e99bd40ecaecc7f4e44ee3cd5',
        clientSecret:'56550b14a86c46398f7314a946c1a286',
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToke:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn:data.body.expires_in
        })
    }).catch(()=>{
        res.sendStatus(400)
        
    })
})

app.listen(3001)