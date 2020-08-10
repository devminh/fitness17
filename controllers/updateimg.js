module.exports = function (app,mongo,url){
  app.get("/updateavatar", function(request, response)  {

    response.render("updateavatar",{loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

  });


  app.get("/updatecourseimg/:courseid", function(request, response)  {
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

      const courses = db.collection('courses');



      courses.find({
         "courseid" : ObjectID(courseid)

      }).toArray(function(err, result)
      {
      if (err) throw err;


      response.render("updatecourseimg",{course:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});



    });


});


    })


    app.post('/updatecourseimgtodb', function(request, response) {
        var courseid = request.body.courseid;
        var imglink = request.body.imglink;
        console.log('courseid khi nhan tu frontend'+courseid);
        console.log(imglink);

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

          const collection = db.collection('courses');


            collection.updateOne(
              {courseid:ObjectID(courseid)},
              {
                $set:{
                  courseimg:imglink
                }
              }

            );



        })

    });





  app.post('/updateavatartoserver', function(request, response) {
      var imglink = request.body.imglink;
      console.log(imglink);
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


          collection.updateOne(
            {email:email},
            {
              $set:{
                avatarsrc:imglink
              }
            }

          )



      })

  });



}
