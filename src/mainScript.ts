/**
 * @author Cas van Dongen <info@buitengewoonuniek.nl>
 * @since 24-01-2017
 * @todo
 * Extend the Title.drawbox method in TItle class
 * Add page with top 100 IMDB movies to netflix
 */

//* Import everything
import * as $ from 'jquery';
import {Title} from "./classes/title.class";

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