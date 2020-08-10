var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        document.querySelector('.status').innerHTML =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';

            $('.updateimgtodb').click(function(){
              console.log('click');


              let request="imglink="+get_link;

                  console.log(request);

                      let xhr = new XMLHttpRequest();

                      xhr.open("post", "/updateavatartoserver", true);

                      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                      xhr.onload = function()
                      {


                      }

                  xhr.send(request);

                  $('.center').append('<div class="alert alert-success">Update avatar thành công ! Vui lòng refresh lại trang thông tin cá nhân</div>');
            })

    }
};

new Imgur({
    clientid: '36b44fd6daa4069', //You can change this ClientID
    callback: feedback
});
