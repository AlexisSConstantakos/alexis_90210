(function(){

  $(function(){

    //variable to hold current student we have selected for edit
    let currentCast;

    //disable all input fields at first
    $("#castAddForm :input").prop("disabled", true);

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
              <td><button data-castid="${castMembers[i].id}" class="btn btn-primary editButton">Edit Record</button></td>
            </tr>
          `)
        }

      })
    }

    //inital load of our student data in our table
    retrieveCast();

    $("#castList").on("click", ".editButton", function(){

      //store current student in variable for when we submit the form
      //we need this to know what student we are updating
      //variable declared on line 5
      currentCast = $(this).data("castid");

      $.get("http://localhost:1337/user/" + currentCast, function(cast){

        //loop over the student i got back from the api
        $.each(cast, function(key, val){
            //find the input field that matches the name of the key
            let el = $('[name="'+key+'"]');
            //find the type of field that we selected
            let type = el.attr('type');

            //based on the type choose how we set the value
            switch(type){
                case 'checkbox':
                    el.attr('checked', 'checked');
                    break;
                case 'radio':
                    el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    el.val(val);
            }
        });
      })

      //enable input fields after we fill out the form
      $("#castAddForm :input").prop("disabled", false);
    })

    //when the submit button on the form is clicked lets prevent the default behavior
    //we want to stop the form from submitting and reloading the page
    $("#submitButton").click(function(e){

      //prevents default behavior of form submitting
      e.preventDefault()

      $.ajax({
        url: "http://localhost:1337/user/" + currentCast,
        data: $("#castAddForm").serialize(),
        method: "PUT",
        success: function(data){

          //reload student table on success
          retrieveCast();

          //disable form fields again
          $("#castAddForm :input").prop("disabled", true);

          //reset form back to empty fields
          $("#castAddForm")[0].reset()

        }
      })
    })

  })

})()
