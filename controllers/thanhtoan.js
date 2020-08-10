module.exports = function (app,mongo,url){
  app.get("/dsthanhtoan", function(request, response)  {
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
        "verify":"false"

      }).toArray(
        function(err, result)
      {
      if (err) throw err;

      //console.log(result[0].hoten);

      if(request.session.loggedin==true && request.session.vitri !=='pt' ){
      response.render("dsthanhtoan",{payment:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
      }
      else{
        let notification = "Bạn không có quyền truy cập trang này !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
      }


  response.end();

      });

    })
  });

  app.get('/xacnhanthanhtoan', function(request, response){
    let courseid = request.query.courseid;
    let useremail = request.query.useremail;

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

        collection.updateOne(
          {courseid:ObjectID(courseid),useremail:useremail},
          {
            $set:{
              "condition":"run",
              "verify":"true"

            }
          }
        );
        let notification = "Xác nhận thanh toán thành công !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

    response.end();

        });

      })




}
