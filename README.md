A) How to setup the app

1) Installing dependencies
    yarn install
    then
    cd /client && yarn install
2) Generate an ngrok link with the command in a new terminal
    ngrok http {SERVER_PORT} the default port is 3000

3) Create a .env file at the root of the project folder then copy the .env.example file inside your .env then replace the tokens and ngrok link with yours

4) Open the file /client/src/common/config and replace the API link with your ngrok link like this

const config = {
  API: {YOUR_NGROK_LINK} //'https://5ac6-51-195-44-15.eu.ngrok.io'
}

5) Then add this ngrok link in your partner dashboard and save
![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)

B) How to start the APP
 cd /client
    yarn build
 then

 cd /
    yarn build
    yarn start

Finally visit your shopify app from your shopify dashboard or open your app from your ngrok link