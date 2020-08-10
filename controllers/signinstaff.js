
module.exports = function (app,mongo,url){
  app.post('/auth', function(request, response) {
  	var email = request.body.email;
  	var password = request.body.password;


  	if (email && password) {

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
        const bcrypt = require('bcrypt');


        collection.find({
           "email": email,


        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        if(result.length==0){
          let notification = "Bạn nhập sai email";
          response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
        }
        else{
          if(bcrypt.compareSync(password, result[0].password))
          {
   // Passwords match
   if(result.length > 0){
     request.session.loggedin = true;
     request.session.email = email;
     request.session.hoten = result[0].hoten;
     request.session.vitri = result[0].vitri;



     response.redirect('/');
   }



      }
      else{
        let notification = "Bạn nhập sai mật khẩu!";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      }
        }





        //console.log(result[0].hoten);







    response.end();

        });


      })
}
  else {
    response.send('Please enter Username and Password!');
    response.end();
  }


  });

  app.get("/signinstaff", function(request, response)  {
      response.render("signinstaff",{loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
  });



}
