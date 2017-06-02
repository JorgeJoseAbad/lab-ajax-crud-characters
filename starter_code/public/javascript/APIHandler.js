/*jshint esversion:6 */
//APIHandler es una clase, tiene constructor al que se pasa una baseURL desde
// su instanciador en index.js
let urlCharacters; //defino variable globalmente accesible
//y luego voy cambiando las referencias url.
class APIHandler {

  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    console.log(this.BASE_URL);
    urlCharacters=this.BASE_URL+`/characters`;
    console.log(urlCharacters);
  }

    getFullList (){
      console.log(urlCharacters);
      $.ajax({

        url: urlCharacters,
        //url: "https://ih-api.herokuapp.com/characters",
        method: "GET",
        success: function (response) {
          console.log(response);
        },
        error: function (err) {
          console.log(err);
        },
      });
  }

  getOneRegister (id) {
    $.ajax({
      //url: "https://ih-api.herokuapp.com/characters/"+id,
      url: urlCharacters+`/`+id,
      method: "GET",
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  createOneRegister () {
      event.preventDefault();

      function showFeedback (postResponse) {
        console.log('post success');
        console.log(postResponse);
        const newCharacterHtml = `
          <li>
            <h3> ${postResponse.name} </h3>
            <p> Id: ${postResponse.id} </p>
          </li>
        `;

        $('#characters-list').append(newCharacterHtml);
      }

      function handleError (err) {
        console.log('Oh no! Error:');
        console.log(err);
      }



      const characterInfo = {
        name:        $("input[name*='name']").val(),
        occupation:  $("input[name*='occupation']").val(),
        weapon:      $("input[name*='weapon']").val(),
        debt:        $("input[type*='checkbox']").val(),
      };

      $.ajax({
        type: 'POST',
        //url: 'https://ih-api.herokuapp.com/characters',
        url:  urlCharacters,
        data: characterInfo,
        success: showFeedback,
        error: handleError
      });

  }

  updateOneRegister (id) {
    event.preventDefault();

    const characterUptd = {

      name:        $("input[name*='name-up']").val(),
      occupation:  $("input[name*='occupation-up']").val(),
      weapon:      $("input[name*='weapon-up']").val(),
      debt:        $("input[type*='checkbox']").val(),
    };


    $.ajax({
      // Notice that we are using PATCH. You could also use PUT.
    type: 'PATCH',
    url: `https://ih-api.herokuapp.com/characters/`+id,
    data: characterUptd,
    success: (patchResponse) => {
      console.log('Update SUCCESS!');
      console.log(patchResponse);
    },
    error: function (err) {
      console.log(err);
      },
    });

  }


  deleteOneRegister (id) {
    $.ajax({
      url: "https://ih-api.herokuapp.com/characters/"+id,
      method: "DELETE",
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
}
