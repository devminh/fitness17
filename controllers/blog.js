module.exports = function (app,mongo,url){
  app.get("/postblog", function(request, response)  {
    if (request.session.loggedin) {
      response.render("postblog",{loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email} );
    }
    else{
      	response.send('Please login to view this page!');
    }

  });

  app.post('/createblog', function(request, response) {
    var title = request.body.title;
      var intro = request.body.intro;
    var content = request.body.content;
    var email  =  request.session.email;
    var hoten  =  request.session.hoten;
    var vitri  = request.session.vitri;



    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      const db = client.db('fitness17');

      const collection = db.collection('blogs');

      collection.insertOne(
       {
         title: title,
         intro: intro,
        content: content,
        email: email,
        hoten : hoten,
        vitri : vitri,
        date : new Date(),
        verify : "true"
       }
    );


    })




  });

  app.get("/bloglist", function(request, response)  {

        mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }, (err, client) => {
          if (err) {
            console.error(err)
            return
          }
          const db = client.db('fitness17');

          const collection = db.collection('blogs');

          collection.find({}).sort( { date: -1 } ).toArray(
            function(err, result)
          {
          if (err) throw err;
          response.render('bloglist', {result: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});



        })

        })



  });


  app.get("/qlblog", function(request, response)  {

        mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }, (err, client) => {
          if (err) {
            console.error(err)
            return
          }
          const db = client.db('fitness17');

          const collection = db.collection('blogs');

          if(request.session.loggedin !== true)
          {
            let notification = "Bạn không có quyền truy cập trang này !";
            response.render("thongbao",{notification:notification,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

          }

          if(request.session.vitri == 'admin')
          {
            collection.find({}).sort( { date: -1 } ).toArray(
              function(err, result)
            {
            if (err) throw err;
            response.render('qlblog', {result: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

          })

          }

          if(request.session.vitri != 'admin')
          {
            collection.find({
              "email":request.session.email
            }).sort( { date: -1 } ).toArray(
              function(err, result)
            {
            if (err) throw err;
            response.render('qlblog', {result: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});

          })

          }



        })


  });




  app.get('/showblog/:id', function(request, response){
      var postid = request.params.id;
      console.log(postid);

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

        const collection = db.collection('blogs');

        collection.find({
           _id : ObjectID(postid)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("showblog", {result: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});



    response.end();

        });


      })


  });


  app.get('/editblog/:id', function(request, response){
      var postid = request.params.id;


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

        const collection = db.collection('blogs');

        collection.find({
           _id : ObjectID(postid)

        }).toArray(
          function(err, result)
        {
        if (err) throw err;

        response.render("editblog", {result: result,loggedin: request.session.loggedin,hoten:request.session.hoten,  vitri:request.session.vitri, email:request.session.email});



    response.end();

        });


      })


  });


  app.get('/deleteblog/:id', function(request, response){
      var blogid = request.params.id;


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

        const collection = db.collection('blogs');

        collection.deleteOne({
           _id : ObjectID(blogid)

        })
        response.redirect('/qlblog');

      })


  });

  app.post('/editblogtodb', function(request, response) {
    var blogid = request.body.blogid;
    var title = request.body.title;
    var intro = request.body.intro;
    var content = request.body.content;

    console.log(blogid);
    console.log(title);

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

      const collection = db.collection('blogs');

      collection.updateOne(
          {_id:ObjectID(blogid)},
        {
          $set:{
          title: title,
          intro: intro,
         content: content
        }
      }


    );


    })
  });



}
