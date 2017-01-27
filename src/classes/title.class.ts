/**
 * @author Cas van Dongen <info@buitengewoonuniek.nl>
 * @since 27-01-2017
 */

import * as Promise from "bluebird";
import * as $ from 'jquery';

//* Netflix Title class
export class Title {

  public name:string;
  private overlay:JQuery;
  private score:number;
  private colorClass:string;

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

    //* Check if Response is not false
    if (imdb.Title && imdb.imdbVotes != "N/A") {

      //* Movie found
      this.score = parseFloat(imdb.imdbRating);

    }

    //* Set class based on score
    if (this.score > 7.5){

      this.colorClass = "good";
    } else if(this.score > 5.5) {

      this.colorClass = "medium";
    } else if(this.score > 0) {

      this.colorClass = "bad";
    } else {

      this.colorClass = "inactive";
    }

    //* Append all the data to the container
    $(container).append('<div class="bob-imdb-extra ' + this.colorClass + '">' + this.score + '</div>');
  }
}