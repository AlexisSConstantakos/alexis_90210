(function(){


  // alert("page open")

  $(function(){

    let searchTerm = $("#searchTerm");
    let searchButton = $("#searchButton");
    let castList = $("#castList");
    let castUrl = "http://localhost:1337/user"

    function getCast(castUrl){

        $.get(castUrl, function(data){

          let cast = data;
          castList.html("");

            $.each(cast, function(index, castMembers){

              castList.append(`
                <tr>
                  <td>${castMembers[i].firstName}</td>
                  <td>${castMembers[i].lastName}</td>
                  <td>${castMembers[i].email}</td>
                  <td>${castMembers[i].title}</td>
                </tr>
              `)
            })
        })
    }


    //anything in this section will not run until the page has loaded
    //anything defined as a ‘let’ cannot be utilized outside of this function

    getCast(castUrl);

  })

})()
