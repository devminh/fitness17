module.exports = function (app,mongo,url){
  app.get("/thanhtich-showbuoi/:courseid", function(request, response)  {

  var courseid = request.params.courseid;
  console.log(courseid);
  if(request.session.vitri !== 'pt')
  {
    let notification = "Bạn không có quyền truy cập trang này !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
  }
  if(request.session.loggedin===undefined){
    let notification = "Vui lòng đăng nhập để đăng kí lớp học !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
  }
  else{
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

      const buoitap = db.collection('buoitap');

      buoitap.find({
        $query: {"courseid":ObjectID(courseid)},


      }).sort({"sttbuoi": 1}).toArray(
        function(err,result){
          if (err) throw err;

          response.render("thanhtich-showbuoi",{buoitap:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );


        }


      )


    })

  }

});

app.get("/xemthanhtich-showbuoi/:courseid", function(request, response)  {

var courseid = request.params.courseid;
console.log(courseid);
if(request.session.loggedin===undefined){
  let notification = "Vui lòng đăng nhập để đăng kí lớp học !";
  response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
}
else{
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

    const buoitap = db.collection('buoitap');

    buoitap.find({
      $query: {"courseid":ObjectID(courseid)},


    }).sort({"sttbuoi": 1}).toArray(
      function(err,result){
        if (err) throw err;

        response.render("xemthanhtich-showbuoi",{buoitap:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );


      }


    )


  })

}

});



app.get('/thanhtichtheobuoi', function(request, response) {
// hoc vien diem danh roi moi duoc nhap thanh tich
if(request.session.loggedin===undefined){
  let notification = "Vui lòng đăng nhập để đăng kí lớp học !";
  response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
}

// Access the provided 'page' and 'limt' query parameters
let courseid = request.query.courseid;
let sttbuoi = request.query.sttbuoi;
  var ObjectID=require('mongodb').ObjectID;

console.log(courseid);
sttbuoi = parseInt(sttbuoi);
console.log(sttbuoi);

mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
if (err) {
  console.error(err)
  return
}

const db = client.db('fitness17');
const buoitap = db.collection('buoitap');

buoitap.find({
"courseid":ObjectID(courseid),
"sttbuoi":sttbuoi
}).toArray(
function(err,result){
  if (err) throw err;

  let buoitap= result;
  let dstap = result[0].dstap;
  console.log(dstap);

  response.render("thanhtichtheobuoi",{buoitap:buoitap,dstap:dstap,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );


})





  })

});


app.get('/xemthanhtichtheobuoi', function(request, response) {
// hoc vien diem danh roi moi duoc nhap thanh tich
if(request.session.loggedin===undefined){
  let notification = "Vui lòng đăng nhập để đăng kí lớp học !";
  response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});
}

// Access the provided 'page' and 'limt' query parameters
let courseid = request.query.courseid;
let sttbuoi = request.query.sttbuoi;
  var ObjectID=require('mongodb').ObjectID;

console.log(courseid);
sttbuoi = parseInt(sttbuoi);
console.log(sttbuoi);

mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
if (err) {
  console.error(err)
  return
}

const db = client.db('fitness17');
const thanhtich = db.collection('thanhtich');

thanhtich.find({
"courseid":ObjectID(courseid),
"sttbuoi":sttbuoi
}).toArray(
function(err,result){
  if (err) throw err;

  

  if(result.length ==0 ){
    let notification = "Bạn chưa nhập thành tích buổi này";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

  }
  else{
    response.render("xemthanhtichtheobuoi",{thanhtich:result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );

  }



})





  })

});

app.post("/nhapthanhtich", function(request, response)  {

  //basic variable
  var coursename = request.body.coursename;
  var courseid = request.body.courseid;
  var sttbuoi = request.body.sttbuoi;
  sttbuoi = parseInt(sttbuoi);
  var activestudent = request.body.activestudent;


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

    const thanhtich = db.collection('thanhtich');

    for(let i=0;i<activestudent;i++){

      var useremail = request.body['useremail'+i];
      var fullname = request.body['fullname'+i];

      let calo = request.body['calo'+i];
      let conguc = request.body['conguc'+i];
      let deodai = request.body['deodai'+i];
      let cobung = request.body['cobung'+i];
      let cochan = request.body['cochan'+i];
      let covai = request.body['covai'+i];

      thanhtich.insertOne(
       {
         courseid : ObjectID(courseid),
         coursename: coursename,
         sttbuoi:sttbuoi,
         useremail:useremail,
         fullname:fullname,
         calo:calo,
         conguc:conguc,
         deodai:deodai,
         cobung:cobung,
         cochan:cochan,
         covai:covai
       }
    );

    }

    let notification = "Nhập thành tích thành công !";
    response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});



  })







})


}
