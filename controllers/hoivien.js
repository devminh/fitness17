module.exports = function (app,mongo,url){
  app.get("/hoivien", function(request, response)  {

    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      const db = client.db('fitness17');

      const collection = db.collection('users');

      collection.find({}).toArray(
        function(err, result)
      {
      if (err) throw err;
      if(request.session.loggedin==true){
        response.render("hoivien",{users:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

      }
      else{
        let notification = "Vui lòng đăng nhập !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
      }





    })

    })
  });

  app.get('/dshocvientheolop/:courseid', function(request, response){
      var courseid = request.params.courseid;
      console.log(courseid);

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

        const collection = db.collection('enrollcourse');

        collection.find({
           "courseid" : ObjectID(courseid)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("dshocvientheolop", {userlist: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

        });
      })

  });

  app.get('/userinfo/:id', function(request, response){
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

        const collection = db.collection('users');

        collection.find({
           "_id":ObjectID(id)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("userinfo", {profile: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    response.end();

        } );
      })
  });


  app.get('/userinfobyemail/:email', function(request, response){
      var email = request.params.email;
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

        const collection = db.collection('users');

        collection.find({
           "email":email

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("userinfo", {profile: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    response.end();

        } );
      })
  });





  app.get('/edithealth/:id', function(request, response){
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

        const collection = db.collection('users');

        collection.find({
           "_id":ObjectID(id)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("edithealth", {profile: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    response.end();

        } );
      })
  });

  app.post('/changedhealth', function (request, response) {
    var body = request.body;
    var userid = body.userid;
    let height = body.height;
    let weight = body.weight;
    let vong1= body.vong1;
    let vong2= body.vong2;
    let vong3= body.vong3;
    let luongco = body.muscle;
    let luongmo= body.fatmass;
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

      const collection = db.collection('users');

      collection.updateOne(
        {_id:ObjectID(userid)},
        {
          $set:{
            chieucao:height,
            cannang:weight,
            vong1:vong1,
            vong2:vong2,
            vong3:vong3,
            luongco:luongco,
            luongmo:luongmo
          }
        }

      )
      let notification = "Cập nhật thông tin sức khỏe cho hội viên thành công !";
      response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    })


  })

  app.get('/kickrequest/:id', function(request, response){
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

        const collection = db.collection('users');

        collection.find({
           "_id":ObjectID(id)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("kickrequest", {profile: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    response.end();

        } );

      })
  });


  app.post('/sendkickrequest', function (request, response) {
    var body = request.body;
    var userid = body.userid;
    let hoten = body.fullname;
    let dob = body.dob;
    let email = body.email;
    let cmnd= body.cmnd;
    let tel = body.tel;
    let reason = body.reason;
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

      const collection = db.collection('kickrequest');

      collection.insertOne({
        userid:ObjectID(userid),
        hoten:hoten,
        dob:dob,
        email:email,
        tel:tel,
        cmnd:cmnd,
        reason:reason


      })
      let notification = "Đã gửi yêu cầu loại hội viên tới admin";
      response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    })


  })

  app.post('/searchhoivien', function (request, response) {

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

      const collection = db.collection('users');

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
        let notification = "Không tìm thấy hội viên !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
      }
      else{
        response.render("hoivien", {users: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      }

  response.end();

      });
    })

  })

  app.get("/kicklist", function(request, response)  {

    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      const db = client.db('fitness17');

      const collection = db.collection('kickrequest');

      collection.find({}).toArray(
        function(err, result)
      {
      if (err) throw err;
        if(request.session.vitri =='admin'){
          response.render("kicklist",{kicklist:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

        }
        else{
          let notification = "Bạn không có quyền vô trang này !";
          response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
        }

    })

    })
  });

  app.get('/deleteuser/:email', function(request, response){
      var email = request.params.email;

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

        const users = db.collection('users');

        const kickrequest = db.collection('kickrequest');

        const enrollcourse = db.collection('enrollcourse');


        users.deleteOne({
          "email":email
        })

        kickrequest.deleteOne({
          "email":email
        })

        enrollcourse.deleteMany({
          "useremail":email
        })

        let notification = "Loại hội viên thành công !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      })
  });

  app.get('/keepuser/:id', function(request, response){
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

        const users = db.collection('users');

        const kickrequest = db.collection('kickrequest');


        kickrequest.deleteOne({
          "userid":ObjectID(id)
        })

        let notification = "Xóa yêu cầu loại hội viên , hội viên được giữ lại trung tâm !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      })
  });




}
