module.exports = function (multer,app,mongo,url){
  app.get('/changeprofile/:email', function(request, response){
      var email = request.params.email;


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
           "email":email

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("changeprofile", {profile: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});





    response.end();

        });


      })




  });



  // SET STORAGE
  var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'public/upload/avatarimg')
   },
   filename: function (req, file, cb) {
     fileExtension = file.originalname.split('.')[1]
      cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension)
   }

  })

  var upload = multer({ storage: storage })

  app.post("/updateavatar",upload.single('myavatar'), function(request, response)  {
    const file = request.file;
    var imgExtension = ['jpg','jpeg','png','gif','bmp'];
    var path=request.file.path;
   var fileExtension=path.split('.')[1];

   let email = request.session.email;
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

     if(imgExtension.includes(fileExtension)){

       collection.updateOne(
         {email:email},
         {
           $set:{
             avatarsrc:path
           }
         }

       )

     let notification = "Update avatar thành công !";
     response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

    }


     else{
       let notification = "Sai định dạng avatar !";
       response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
     }

   })



  })


  app.post("/updateprofile", function(request, response)  {
    var hoten = request.body.hoten;
    var dob = request.body.dob;
    var tel = request.body.tel;
    var email = request.body.email;
    var cmnd = request.body.cmnd;
    var bangcap = request.body.bangcap;

    console.log(email);

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


             collection.updateOne(
               {email:email},
               {
                 $set:{
                   hoten:hoten,
                   namsinh:dob,
                   tel:tel,
                   cmnd:cmnd,
                   bangcap:bangcap
                 }
               }

             )




    })
    let notification = "Update thông tin thành công !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
  })

}
