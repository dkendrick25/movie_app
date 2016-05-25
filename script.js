var page = 1;
//extract duplicated ajax into a function
function search() {
  var userInput = $('#search-field').val();
  $.ajax({
    url: 'http://www.omdbapi.com/',
    data: {
      s: userInput,
      page: page
    },
    success: function(data) {
      var total = Number(data.totalResults);
      if (total > page * 10) {
        $('.more').show();
      } else {
        $('.more').hide();
      }
      page++;
      console.log('Returned data', data);
      var results = data.Search;
      //loops through data search array
      for (var i = 0; i < results.length; i++){
        //adds link with a displayed img poster
        var a = $('<a>')
        .attr('href','http://www.imdb.com/title/' + results[i].imdbID).data('imdbId', results[i].imdbID);
        var img = $('<img>')
        .attr('src', results[i].Poster)
        .attr('alt', results[i].Title);
        a.append(img);
        //adds link and images to html
        $('#results').append(a);
      }
    }
  });
}


$(function () {
  //hide detail page
  $('#details-page').hide();
  //initially hide the more button
  $('.more').hide();
  $('.more').click(function(event) {
    search();
  });
  //when clicking on a image with a link
  /* disable going to a new link when anchor is clicked */
  $('#results').on('click', 'a', function(event) {
    event.preventDefault();
    $('#search-page').hide();
    $('#details-page').show();
    //this sets the click img imdbid to a varible
    var imdbId = $(this).data('imdbId');
    /* another ajax call here */
    //use that imdbid to search for data on that particular movie
    $.ajax({
      url: 'http://www.omdbapi.com/',
      data: {
        i: imdbId
      },
      //take the returned data and display it on the results page
      success: function(data){
        console.log(data);
        console.log(data.Actors);
        $('.actors').text(data.Actors);
        $('.title').text(data.Title);
        $('.plot').text(data.Plot);
        $('.rating').text(data.Rated);
        $('.genre').text(data.Genre);
        $('.year').text(data.Year);
        $('.posterimg').html('<img src="' + data.Poster + '">');
      }
    });

  });
  //when click returns page back to the search page
  $('#go-back').click(function (event) {
    event.preventDefault();
    $('#search-page').show();
    $('#details-page').hide();

  });

  //when form sumbits, take user input and use ajax to return data
  $('form').submit(function (event) {
    event.preventDefault();
    //reset the num of pages
    page = 1;
    //give the results a blank screen
    $('#results').html('');
    //gets the userinput
    //var userInput = $('#search-field').val();
    //uses ajax to return userinput data via the search
    // $.ajax({
    //   url: 'http://www.omdbapi.com/',
    //   data: {
    //     s: userInput,
    //     page: page
    //   },
    //   success: function(data) {
    //     console.log('Returned data', data);
    //     var results = data.Search;
    //     //loops through data search array
    //     for (var i = 0; i < results.length; i++){
    //       //adds link with a displayed img poster
    //       var a = $('<a>')
    //       .attr('href','http://www.imdb.com/title/' + results[i].imdbID).data('imdbId', results[i].imdbID);
    //       var img = $('<img>')
    //       .attr('src', results[i].Poster)
    //       .attr('alt', results[i].Title);
    //       a.append(img);
    //       //adds link and images to html
    //       $('#results').append(a);
    //     }
    //     page++;
        search();

        //check if num of pages is less than results
        // if (page < Math.ceil((data.totalResults / 10))) {
        //   //show more button
        //   $('.more').show();
        //   var userInput = $('#search-field').val();
        //   $('.more').click(function() {
        //     $.ajax({
        //       url: 'http://www.omdbapi.com/',
        //       data: {
        //         s: userInput,
        //         page: page
        //       },
        //       success: function(data) {
        //         console.log('Returned data', data);
        //         var results = data.Search;
        //         //loops through data search array
        //         for (var i = 0; i < results.length; i++){
        //           //adds link with a displayed img poster
        //           var a = $('<a>')
        //           .attr('href','http://www.imdb.com/title/' + results[i].imdbID);
        //           var img = $('<img>')
        //           .attr('src', results[i].Poster)
        //           .attr('alt', results[i].Title);
        //           a.append(img);
        //           //adds link and images to html
        //           $('#results').append(a);
        //         }
        //       }
        //     })
        //     page++;
        //     if (page === Math.ceil((data.totalResults / 10))) {
        //       $('.more').hide();
        //     }
        //   })
        // }
      //}
    //});
  });
});
