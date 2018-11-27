$("#search-artist").on('click',function(event){
    event.preventDefault();

    watchSubmit();
    var tracknameinput=$('#track-name').val();
    var artistnameinput=$('#artist-name').val();
    var token='BQAsRw4IDJ6iMrN7DnzmZ3_nYMDXlWHvQOKOcTDfJrbb2FAnr-Rv3cqRiOL6SIa_kcKT6gMIiZA2oHShGhMURQIhFOqRZvy-EsTylxZ8xKvYy7dbVDgLyOCIWTnFDnLQ4EdyoCCsHwcI5XK85sz8Pw````';
    var queryURL="https://api.spotify.com/v1/search?q=";
    if(tracknameinput){
        queryURL +=" track:"+tracknameinput;
    }
    if(artistnameinput){
        queryURL +=" artist:"+artistnameinput;
    };
    queryURL += "&type=track&limit=1";
    console.log(artistnameinput);
    $.ajax({
        url:queryURL,
        headers: {
           Authorization: 'Bearer ' + token
         },
        method:'GET'
    }).then(function(response){
        var col_1 =  $(' <tr><td>' + "<audio controls><source src=" 
            + response.tracks.items[0].preview_url+" type='audio/mpeg'>" + '<div></div>'
            + "</audio>" + "<img src="+ response.tracks.items[0].album.images[1].url + ">" 
            + "<div id= 'trackname'>" + response.tracks.items[0].name + "</div>" + "<div id= 'artistname'>" 
            + response.tracks.items[0].album.artists[0].name + "</div>" + "</td></tr>");
        $("#tracks").append(col_1);
        console.log(response)
    })
    })

    $("#search-artist").on('click',function(event){
        event.preventDefault();

        watchSubmit();

        var artistnameinput=$('#artist-name').val();
        var token='BQAsRw4IDJ6iMrN7DnzmZ3_nYMDXlWHvQOKOcTDfJrbb2FAnr-Rv3cqRiOL6SIa_kcKT6gMIiZA2oHShGhMURQIhFOqRZvy-EsTylxZ8xKvYy7dbVDgLyOCIWTnFDnLQ4EdyoCCsHwcI5XK85sz8Pw';
        var queryURL="https://api.spotify.com/v1/search?q="+artistnameinput+"&type=artist&limit=1";
        console.log(artistnameinput);
        $.ajax({
            url:queryURL,
            headers: {
               Authorization: 'Bearer ' + token
             },
            method:'GET'
        }).then(function(response){
            var col_2 = $(
                '<tr><td><a id= "profilelink" href=' + response.artists.items[0].external_urls.spotify+'>Click here for artist profile and albums!</a>' + '<div></div>'
                 + "<img src=" + response.artists.items[0].images[1].url +" />"
                 + "<div id= 'personname'>" + response.artists.items[0].name + "</div>" + "</td></tr>");
            $("#artist-info").append(col_2);
            console.log(response)
        })
        })

        function getDataFromApi(artist, title, callback) {
            let URL = `https://api.lyrics.ovh/v1/${artist}/${title}`;
            $.getJSON(URL, callback);
            console.log(URL);
          }
          
          function displaySearchData(data) {
            console.log(data);
            $("#lyrics").html(`${data.lyrics}`);
          }
          
          function watchSubmit() {
              let artistTarget = $('#artist-name');
              let titleTarget = $('#track-name');
              let artist = artistTarget.val();
              let title = titleTarget.val();
              
              
              getDataFromApi(artist, title, displaySearchData);
          }

          $(document).ready(function () {
            // This function gets the data from the YouTube API and displays it on the page
            function getResults(searchTerm) {
                $.getJSON("https://www.googleapis.com/youtube/v3/search",
                    {
                        "part": "snippet",
                        "key": "AIzaSyBkK8PEuhSfyz05gnUWhwOuE5cqWV5Oa3A",
                        "q": searchTerm,
                        "maxResults": 1
                    },
                    function (data) {
                        if (data.pageInfo.totalResults == 0) {
                            alert("No results!");
                        }
                        // If no results, empty the list
               displayResults(data.items);
               console.log(data);
                    }
                );
            }
        
            //Display results in ul
            function displayResults(videos) {
                var html = "";
                $.each(videos, function (index, video) {
                    // Append results li to ul
                    //console.log(video.snippet.title);
                    //console.log(video.snippet.thumbnails.high.url);
                    html = html +
                        "</p><iframe width='600' hieght='600' src='https://www.youtube.com/embed/watch" + video.id.videoId + "'></iframe></a></li>" ;
                });
                $("#videos").html(html);
            }
        
            //Use search track
            $("#search-artist").on('click',function(event){
           event.preventDefault();
           watchSubmit()
           var sum=$("#track-name").val()+ " " + $("#artist-name").val();
           getResults(sum);
           console.log(sum);
         });
        });

        