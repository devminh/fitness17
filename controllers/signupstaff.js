

module.exports = function (app,mongo,url){
  app.get("/signupstaff", function(request, response)  {
      response.render("signupstaff",{loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
  });

  app.post('/signup', function (req, res, next) {
    var body = req.body;
    let pos = body.position;
    let fullname = body.fullname;
    let email = body.email;
    let tel = body.tel;
    let password1 = body.password1;
    let password2 = body.password2;
    let cmnd = body.cmnd;
    let dob =  body.dob;
    //res.set('Content-Type', 'text/html');
    /*
    if(password1 !== password2){
      console.log("sai pass !");

    }
    else{
      res.render("signupstaff");
    }
*/

    console.log(pos);
    console.log(fullname);

    const bcrypt = require('bcrypt');





    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      const db = client.db('fitness17');

      const collection = db.collection('staff');



      collection.find({
         "email": email

      }).toArray(
        function(err, result)
      {
      if (err) throw err;


        if(result.length > 0)
        {

          let notification = "Email đã tồn tại !";
          res.render("thongbao",{notification:notification,loggedin: req.session.loggedin,hoten:req.session.hoten,  vitri:req.session.vitri, email:req.session.email});
        }
        else
        {
          if(cmnd.length !== 9 && cmnd.length !== 12){
          let notification = "CMND phải có 9 hoặc 12 kí số !";
          res.render("thongbao",{notification:notification,loggedin: req.session.loggedin,hoten:req.session.hoten,  vitri:req.session.vitri, email:req.session.email});
        }
        else{



          if(password1 == password2){

          let hash = bcrypt.hashSync(password1, 10);



          collection.insertOne(
           {
             vitri : pos,
             hoten: fullname,
             namsinh:dob,
             email : email,
             tel : tel,
             cmnd:cmnd,
             bangcap:"",
             avatarsrc:"https://i.imgur.com/9bP7ahd.png",
             password : hash

           }
         );
         let notification = "Tạo tài khoản cho staff thành công !";
         res.render("thongbao",{notification:notification,loggedin: req.session.loggedin,hoten:req.session.hoten,  vitri:req.session.vitri, email:req.session.email});

         }


        else{
          let notification = "Mật khẩu nhập lại không trùng !";
          res.render("thongbao",{notification:notification,loggedin: req.session.loggedin,hoten:req.session.hoten,  vitri:req.session.vitri, email:req.session.email});

        }

            }


      }


      });

    })


  });

}
