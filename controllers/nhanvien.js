module.exports = function (app,mongo,url){
  app.get("/dsnhanvien", function(request, response)  {

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

      collection.find({}).toArray(
        function(err, result)
      {
      if (err) throw err;
      if(request.session.loggedin==true){
        response.render("dsnhanvien",{staff:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

      }
      else{
        let notification = "Vui lòng đăng nhập !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
      }


    })

    })

  });



  app.get('/staffinfo/:id', function(request, response){
      var id = request.params.id;
      var ObjectID=require('mongodb').ObjectID;
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
           "_id":ObjectID(id)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("staffinfo", {profile: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    response.end();

        } );
      })
  });






  app.post('/searchstaff', function (request, response) {

    var body = request.body;
    var searchvalue = body.searchvalue;
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
        "$or": [
          {
     "hoten": {'$regex' : searchvalue, '$options' : 'i'}
    }, {
     "email": {'$regex' : searchvalue, '$options' : 'i'}
    }
  ]

      }).toArray(
        function(err, result)
      {
      if (err) throw err;

      if(result.length==0){
        let notification = "Không tìm thấy nhân viên !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
      }
      else{
        response.render("dsnhanvien", {staff: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      }

  response.end();

      });
    })

  })

  app.get('/deletestaff/:id', function(request, response){
      var id = request.params.id;
      var ObjectID=require('mongodb').ObjectID;
      mongo.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, (err, client) => {
        if (err) {
          console.error(err)
          return
        }

        const db = client.db('fitness17');

        const staff = db.collection('staff');

        const kickrequest = db.collection('kickrequest');

        staff.deleteOne({
          "_id":ObjectID(id)
        })



        let notification = "Xóa tài khoản nhân viên thành công !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      })
  });





}
