/*
Implement: http://www.omdbapi.com/?t=title&y=&plot=short&r=json
*/

//* Import everything
import * as $ from 'jquery';
import * as Promise from "bluebird";

//* Netflix Title class
class Title {

  public name:string;
  private overlay:JQuery;

  //* constructor
  constructor(name:string, overlay:JQuery){

    //* Set class name
    this.name = name;
    this.overlay = overlay;
  }

  //* Get IMDB function
  public initIMDB():void {

    //* Set this into variable to scope inside promise
    var _self = this;

    //* New webrequest with the title name
    this.webRequest(this.name).then(function(result){

      //* Draw the new box.
      _self.drawBox(_self.overlay, result);

    });
  }

  //* Async webRequest function that returns a promise string
  private webRequest(title: string):Promise<string>{

    //* Return new string promise
    return new Promise<string>(function (resolve) {

      //* New httprequest
      var xhr = new XMLHttpRequest();

      //* Open the api with encoded title
      xhr.open("GET", "https://www.omdbapi.com/?t=" + encodeURIComponent(title) + "&y=&plot=short&r=json", true);

      //* On ready
      xhr.onreadystatechange = function() {

        //* Check if request is done
        if (xhr.readyState == XMLHttpRequest.DONE) {

          //* Resolve the response
          resolve(xhr.responseText);
        }
      }

      //* Send request
      xhr.send();
    });
  }

  //* Draw content box method
  private drawBox(container:JQuery, data:string):void {

    var imdb = JSON.parse(data);
    console.log(imdb);

    //* Check if Response is not false
    if (imdb.Title && imdb.imdbVotes != "N/A") {

      //* Movie found
      var text = "<h4>IMDB rating <span class=\"star personal icon-star\"> <span class=\"rating\">" + imdb.imdbRating + "</span></span></h4>";
      text += "<ul><li><strong>Amount of votes: </strong> " + imdb.imdbVotes + "</li></ul>";

    } else {

      //* Movie not found
      var text = "<h4>IMDB rating <span class=\"star personal icon-star\"> <span class=\"rating\">unknown</span></span></h4>";
    }
    
    //* Append all the data to the container
    $(container).append('<div class="bob-imdb-extra">' + text + '</div>');
  }
}

//* Set observer instance of MutationObserver
var observer = new MutationObserver(function(mutations) {

  //* For loop through the mutations
  for (var i = 0; i < mutations.length; i++){

    //* Check if type is object
    if (typeof mutations[i].addedNodes == "object") {

      //* Check the added nodes
      var objects = $(mutations[i].addedNodes);

      //* Only use the bob-cards
      if(objects.is("div.bob-card")) {
        
        //* get Netflix title
        var getTitle = $(".bob-title", objects).html();
        var overlay = $(".bob-overlay", objects);

        //* New instance with getTitle
        var netflixtitle = new Title(getTitle, overlay);

        //* 
        netflixtitle.initIMDB();
      }
    }
  }    
});
 
//* Configuration of the observer
var config = { childList: true, attributes: true, subtree: true };
 
//* Pass the node through each to allow jQuery
$("body").each(function () {

  observer.observe(this, config);
});