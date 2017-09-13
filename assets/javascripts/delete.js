(function(){

  $("#success").hide();

  $(function(){

    //put the get request in a function so it can be reused
    function retrieveCast(){
      //make request to get data from the api
      $.get("http://localhost:1337/user", function(castMembers){

        //clear out existing student list
        $("#castList").empty()

        //loop over students we got back from the api and add to tbody with id of studentList
        for (let i = 0; i < castMembers.length; i++) {
          $("#castList").append(`
            <tr>
              <td>${castMembers[i].firstName}</td>
              <td>${castMembers[i].lastName}</td>
              <td>${castMembers[i].email}</td>
              <td>${castMembers[i].title}</td>
              <td><button data-castid="${castMembers[i].id}" class="btn btn-danger deleteButton">Delete Record</button></td>
            </tr>
          `)
        }

      })
    }

    //inital load of the table
    retrieveCast();

    //onlick for every delete button
    $("#castList").on("click", ".deleteButton", function(){

      //get student id off the button
      let castId = $(this).data("castid")

      //make delete request to the api
      $.ajax({
        url: "http://localhost:1337/user/" + castId,
        method: "DELETE",
        success: function(data){

          //reload student table on success
          retrieveCast();

          //show success div
          $("#success").slideDown();

          //make success message go away after a few seconds
          setTimeout(function(){
            $("#success").slideUp();
          }, 3000)

        }
      })
    })

  })

})()
