module.exports = function (multer,app,mongo,url){
  app.get("/addcourse", function(request, response)  {
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
        "vitri":"pt"
      }).toArray(
        function(err, result)
      {
      if (err) throw err;

      //console.log(result[0].hoten);

      if(request.session.loggedin==true && request.session.vitri =='admin' ){
        response.render("addcourse",{ptlist:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

      }
      else{
        let notification = "Bạn không có quyền truy cập trang này !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

      }



  response.end();

      });

    })

  });

  app.post("/addcoursetodb", function(request, response)  {
    var coursename = request.body.coursename;
    var subject = request.body.subject;
    var duration = request.body.duration;
    var classdays = request.body.days;
    var coach = request.body.coach;
    var description = request.body.description;
    var advantages = request.body.advantages;

    var beginday = request.body.beginday;
    var sothang = request.body.sothang;

    var monthlyfee = request.body.monthlyfee;
    var fullfee = request.body.fullfee;

    var ObjectID=require('mongodb').ObjectID;

    var dash = coach.indexOf('-');
    var coachname = coach.slice(0,dash);
    var coachemail = coach.slice(dash+1,coach.length);
    console.log(coachname);
    console.log(coachemail);

    console.log(beginday);


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

      var courseid = ObjectID();
      console.log(courseid);

      courses.insertOne(
       {
         courseid : courseid,
         coursename: coursename,
         subject : subject,
        duration: duration,
        classdays: classdays,
        coachemail : coachemail,
        coachname : coachname,
        description :description,
        advantages : advantages,
        startday : beginday,
        sothang :sothang,
        monthlyfee:monthlyfee,
        fullfee:fullfee,
        courseimg:"https://i.imgur.com/VF0SEDH.jpg",
        date_created : new Date(),

       }
    );

    const buoitap = db.collection('buoitap');
    for(let i=0;i<classdays;i++){
      buoitap.insertOne(
       {
         courseid : courseid,
         coursename: coursename,
         sttbuoi:i,
         time:"",
         noidung:"",
         dstap:[]

       }
    );
    }



    })



    let notification = "Thêm khóa học thành công";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

  });

  app.get("/qlcourse", function(request, response)  {
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


      collection.find({
        "coachemail":request.session.email


      }).toArray(
        function(err, result)
      {
      if (err) throw err;

      //console.log(result[0].hoten);

      if(request.session.loggedin==true && request.session.vitri =='pt' ){
      response.render("qlcourse",{courselist:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
      }
      else{
        let notification = "Bạn không có quyền truy cập trang này !";
        response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
      }


  response.end();

      });

    })
  });

  app.get("/qlallcourse", function(request, response)  {
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


      collection.find({}).toArray(
        function(err, result)
      {
      if (err) throw err;

      //console.log(result[0].hoten);

        if(request.session.loggedin==true && request.session.vitri !='pt' ){
      response.render("qlallcourse",{courselist:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
    }
    else{
       let notification = "Bạn không có quyền truy cập trang này !";
       response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
     }



  response.end();

      });

    })
  });

  app.get("/deletedcourselist", function(request, response)  {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }

      const db = client.db('fitness17');

      const collection = db.collection('deletedcourses');


      collection.find({}).toArray(
        function(err, result)
      {
      if (err) throw err;

      //console.log(result[0].hoten);

        if(request.session.loggedin==true){
      response.render("deletedcourselist",{courselist:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
    }
    else{
       let notification = "Bạn không có quyền truy cập trang này !";
       response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
     }



  response.end();

      });

    })
  });


  app.get('/capnhatlichtap/:courseid', function(request, response){
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

        const collection = db.collection('buoitap');

        collection.find({
           "courseid" : ObjectID(courseid)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("capnhatlichtap", {buoitap: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

    response.end();

        });


      })

  });

  app.get('/changecourse/:courseid', function(request, response){
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

        const staff = db.collection('staff');

        var courseinfo = courses.find({
           "courseid" : ObjectID(courseid)

        }).toArray();

        var ptlist = staff.find({
          "vitri":"pt"
        }).toArray();


        Promise.all([courseinfo,ptlist]).then(values => {


          response.render("changecourse", {course: values[0],ptlist:values[1],loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});


        });


      })


  })


  app.post("/changecoursetodb", function(request, response)  {
    var courseid = request.body.courseid;
    var coursename = request.body.coursename;
    var subject = request.body.subject;

    var coach = request.body.coach;
    var description = request.body.description;
    var advantages = request.body.advantages;

    var monthlyfee = request.body.monthlyfee;
    var fullfee = request.body.fullfee;

    var ObjectID=require('mongodb').ObjectID;

    var dash = coach.indexOf('-');
    var coachname = coach.slice(0,dash);
    var coachemail = coach.slice(dash+1,coach.length);


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


      console.log(courseid);

      courses.updateOne(

        {courseid:ObjectID(courseid)},
        {
        $set:
       {
         coursename: coursename,
         subject : subject,
        coachemail : coachemail,
        coachname : coachname,
        description :description,
        advantages : advantages,
        monthlyfee:monthlyfee,
        fullfee:fullfee,
        date_updated : new Date(),

       }
     }
    );


    })



    let notification = "Cập nhật khóa học thành công !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

  });

  app.get('/deletecourse/:courseid', function(request, response){
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

        //console.log(result[0].hoten);

        if(request.session.vitri=='admin'){
          response.render("deletecourse", {course:result ,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
        }
        else{
          let notification = "Bạn không có quyền truy cập trang này !";
          response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
        }

      });


      });



  })

  app.post("/deletecoursetodb", function(request, response)  {
    var courseid = request.body.courseid;
    var coursename = request.body.coursename;
    var subject = request.body.subject;
    var beginday = request.body.beginday;
    var sobuoi = request.body.classdays;
    var reason = request.body.reason;

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
      const enrollcourse = db.collection('enrollcourse');
      const buoitap = db.collection('buoitap');
      const deletedcourses = db.collection('deletedcourses');

      console.log(courseid);

      courses.deleteMany({
        "courseid":ObjectID(courseid)
      })

      enrollcourse.deleteMany({
        "courseid":ObjectID(courseid)
      })

      buoitap.deleteMany({
        "courseid":ObjectID(courseid)
      })

      deletedcourses.insertOne({
        courseid : courseid,
        coursename: coursename,
        subject : subject,
        beginday:beginday,
        sobuoi:sobuoi,
        lido:reason


      })

    })

    let notification = "Xóa khóa học thành công !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

  });




  app.post("/updatebuoitap", function(request, response)  {



      var courseid = request.body.courseid;
      var sobuoitap = request.body.sobuoitap;
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




    const buoitap = db.collection('buoitap');

    for(let i=0;i<sobuoitap;i++){
      let buoin = "buoi"+i;
      let noidungn="noidung"+i;

      let datevalue = request.body[buoin];
      let noidung = request.body[noidungn];

      console.log(noidung);
      console.log(datevalue);
      if(datevalue ==""){
        datevalue =="";

      }
      else{
        datevalue=new Date(datevalue);
      }
      buoitap.updateOne(
        {courseid:ObjectID(courseid),sttbuoi:i},
        {
          $set:{
            time:datevalue,
            noidung:noidung
          }
        }

      )


    }




    })




    let notification = "Cập nhật buổi tập thành công !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});


  })


  app.get('/xemphanhoi/:courseid', function(request, response){
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

        const coursecomment = db.collection('coursecomment');

        coursecomment.find({

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        //console.log(result[0].hoten);

        if(request.session.loggedin==true){
          response.render("xemphanhoi", {comment:result ,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
        }
        else{
          let notification = "Bạn không có quyền truy cập trang này !";
          response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
        }


    response.end();

        });
      });


      })


      app.get('/xemdsrutlui/:courseid', function(request, response){
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

            const rutluicourse = db.collection('rutluicourse');

            rutluicourse.find({
              "courseid":ObjectID(courseid)
            }).toArray(
              function(err, result)
            {
            if (err) throw err;

              if(result.length==0){
                let notification = "Danh sách rút lui trống";
                response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
              }
              else{
                if(request.session.loggedin==true){
                  response.render("xemdsrutlui", {dsrutlui:result ,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
                }
                else{
                  let notification = "Bạn không có quyền truy cập trang này !";
                  response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
                }


              }





        response.end();

            });

          });


          })






}
