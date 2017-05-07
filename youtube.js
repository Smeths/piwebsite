// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
//    var responseString = JSON.stringify(response, '', 2);
//    document.getElementById('response').innerHTML += responseString;

// Creating the table

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    x.setAttribute("border", "1");
    x.setAttribute("align","center");
    document.body.appendChild(x);

// Getting number of images/links, rows and remainder images
    var len = response.items.length;
    var imgperrow = 4;
    var numrows = Math.floor(len/imgperrow)+1;
    var remainder = len % imgperrow;
// Looping over rows images/links in the row 
    for (i = 0; i < numrows; i++) {
// Creating row
       var row = document.createElement("TR");
       row.setAttribute("id", i);
       document.getElementById("myTable").appendChild(row);
       for (j = 0; j < imgperrow; j++) {
          var k = imgperrow * i + j
          if (k > len) { break; }
// Creating cell
          var celllink = document.createElement("TD");
          document.getElementById(i).appendChild(celllink);
// Getting data from GET response
          var vtitle = response.items[k].snippet.title;
          var vlink = "https://www.youtube.com/watch?v=";
          vlink += response.items[k].id.videoId;
          var vimage = response.items[k].snippet.thumbnails.medium.url;
// Create a hyperlink element
          var link = document.createElement('A');
          link.setAttribute('href',vlink);
          var textimage = '<img src="' + vimage + '" title = "' + vtitle + '">';
          link.innerHTML = textimage;
          celllink.appendChild(link);
      }
   }
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyBWFgunoD8VLlxD451RPOaa9f6NcLbavEY');

    search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        channelId: 'UCSa-ZazUij7zG5HyGzJObsA',
        type: 'video',
        videoType: 'any',
        maxResults:50

    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}
