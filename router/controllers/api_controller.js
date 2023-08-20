import fs from 'fs';
import { IgApiClient } from 'instagram-private-api';
import * as yup from 'yup';
import path from 'path';
const ig = new IgApiClient();


async function login (req, res)  {
    var username = req.body.username;
    var password = req.body.password;
    var proxy = req.body.proxy;
    let sessionPath = path.join('sessions/' + username + '.json');
    let cookiePath = path.join('cookies/' + username + '.json');
    
    try {
        
    const userCreateSchema = yup.object({
        username: yup.string().email().required(),
        password: yup.string().required(),
      })
    
      ig.state.generateDevice(username);
      if(proxy){
        ig.state.proxyUrl = proxy;
      }
      
      var cookie = '';
      
      
      // if(!fs.existsSync(sessionPath)) {
      // let login = await ig.account.login(username, password);
      // const serialized = await ig.state.serialize();
      // const deserialized = JSON.stringify(serialized);
      // cookie = await ig.state.serializeCookieJar();
      //   fs.writeFileSync(cookiePath, JSON.stringify(cookie));
      //   fs.writeFileSync(sessionPath, deserialized);
      //   console.log("session saved");
      //   await ig.state.deserialize(deserialized);
      // }else{
      //   const file = fs.readFileSync(sessionPath, 'utf8');
      //   const deserialized = JSON.parse(file);
      //   cookie = JSON.parse(fs.readFileSync(cookiePath, 'utf8')); 
      //   await ig.state.deserializeCookieJar(cookie);
      //   await ig.state.deserialize(deserialized);
      //   console.log("session loaded");
      // }
      
      let login = await ig.account.login(username, password);
      const serialized = await ig.state.serialize();
      const deserialized = JSON.stringify(serialized);
      cookie = await ig.state.serializeCookieJar();
      
      let formatedCookie = cookie.cookies.map((item) => {
        return `${item.key}=${item.value}`;
      }).join('; ');

      
    
      // const loggedInUser = await ig.account.currentUser();
      
      res.json({
        "status": true,
        "message": "Login Success",
        "data": {
          'cookie' : formatedCookie
        }
      })
      
        // login(username, password);
    } catch (error) {
       
       res.json({ 
        "status": false, 
        "message": error.message,
        "data": null
       })
    }
}



export { login };