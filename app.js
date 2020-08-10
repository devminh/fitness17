var express = require("express");
  var app = express();

app.use(express.static("public"));

app.use(express.static(__dirname + '/public'));


const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://fitness17:123@minhvu-db-met1i.mongodb.net/test?retryWrites=true&w=majority';

const multer = require('multer');


app.set("view engine", "ejs");
app.set("views", "./views");

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]





var session = require('express-session');
app.use(session({

	secret: 'secret',
	resave: true,
	saveUninitialized: true,

}));


var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//sign-up verify
var signup = require("./controllers/signupstaff.js");
signup(app,mongo,url);

//sign-in verify + sign-in page
var signin = require("./controllers/signinstaff.js");
signin(app,mongo,url);

var updateimg = require("./controllers/updateimg.js");
updateimg(app,mongo,url);

var hoivien = require("./controllers/hoivien.js");
hoivien(app,mongo,url);

var nhanvien = require("./controllers/nhanvien.js");
nhanvien(app,mongo,url);

/*
var googlecloud = require("./controllers/google-cloud-storage.js");
googlecloud(app);
*/

var thanhtoan  = require("./controllers/thanhtoan.js");
thanhtoan(app,mongo,url);

var blog = require("./controllers/blog.js");
blog(app,mongo,url);

var changeprofile = require("./controllers/changeprofile.js");
changeprofile(multer,app,mongo,url);

//add course , edit course,everything related to course
var course = require("./controllers/course.js");
course(multer,app,mongo,url);

//thanh tich tung buoi tap , thanh tich trung binh
var achievement = require("./controllers/achievement.js");
achievement(app,mongo,url);


app.get('/', function(request, response) {

  var ObjectID=require('mongodb').ObjectID;

      // dưới đây dùng để tính toán thời gian gia hạn của hội viên
      mongo.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, (err, client) => {
        if (err) {
          console.error(err)
          return
        }

        const db = client.db('fitness17');

        const enrollcourse = db.collection('enrollcourse');
        let currentdate = new Date();
        //console.log('Ngay hien tai',currentdate);

        enrollcourse.find({

        }).toArray(
      function(err, result)
    {
    if (err) throw err;

      for (var i=0 ;i<result.length;i++){
        if(result[i].ngaydongtienketiep < result[i].ngayketthuckhoahoc)  //xac dinh cac tai khoan can gia han
        {


          if(currentdate >= result[i].ngaydongtienketiep){ //tai khoan den thoi han phai gia han

              enrollcourse.updateOne(
                  {courseid:ObjectID(result[i].courseid),useremail:result[i].useremail},
                {
                  $set:{
                    condition:"pause"
                  }
                }

              )

          }

        }
        else
        {
          if(currentdate >= result[i].ngayketthuckhoahoc) //den thoi han ket thuc khoa hoc
          {

              enrollcourse.updateOne(
                  {courseid:ObjectID(result[i].courseid),useremail:result[i].useremail},
                {
                  $set:{
                    condition:"stop"
                  }
                }

              )

          }


        }


      }


    })



    const users = db.collection('users');
    const staff = db.collection('staff');

    let usercount = users.countDocuments();
    let staffcount = staff.countDocuments();

    Promise.all([usercount,staffcount]).then(values => {

      response.render("homepage",{usercount:values[0],staffcount:values[1],loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

    });

      })

});




app.get("/logout", function(request, response)  {

  request.session.loggedin = false;
  request.session.email = "";
  request.session.hoten = "";
  request.session.vitri = "";
  response.redirect('/');

});
