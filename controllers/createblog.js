module.exports = function (app,mongo,url){

  app.post('/createblog', function(request, response) {
    var title = request.body.title;
      var intro = request.body.intro;
    var content = request.body.content;
    var email  =  request.session.email;
    var hoten  =  request.session.hoten;
    var vitri  = request.session.vitri;

    console.log(title);
    console.log(intro);
    console.log(content);
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



}
