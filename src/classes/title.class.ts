/**
 * @author Cas van Dongen <info@buitengewoonuniek.nl>
 * @since 27-01-2017
 * @todo Create better UI, should design in Photoshop and run a user test.
 */

import * as Promise from "bluebird";
import * as $ from 'jquery';

//* Netflix Title class
export class Title {

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

    //* Data to JSON
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