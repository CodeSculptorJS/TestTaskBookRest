const jwt = require('jsonwebtoken');
const db = require('../models');

const requireAuth =  (req, res, next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                return res.status(400).send('Error verify');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        return res.status(400).send('Unauthorized');
    }
}

// const checkUser = async (req, res, next) => {
//     const token = req.cookies.jwt;
//     if(token) {
//       jwt.verify(token, 'secret', async (err, decodedToken) => {
//         if(err) {
//           console.log(err.message);
//           next();
//         } else {
//           console.log(decodedToken);
//           const user = await db.User.findOne({where: {id: decodedToken.id}});
//           if(user.roleId==1){
//             next();
//           } else {
//             res.status(400).send("Access denied");
//           }
//         }
//       });
//     } else {
//       res.status(400).send('Unauthorized');
//     }
//   }

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
      jwt.verify(token, 'secret', async (err, decodedToken) => {
        if(err) {
          console.log(err.message);
          next();
        } else {
          console.log(decodedToken);
          try {
            const user = await db.User.findOne({where: {id: decodedToken.id}});
            if(user.roleId==1){
              next();
            } else {
              return res.status(400).send("Access denied");
            }
          } catch (err) {
            console.error(err);
            next();
          }
        }
      });
    } else {
      return res.status(400).send('Unauthorized');
    }
  }
  

module.exports={requireAuth, checkUser};