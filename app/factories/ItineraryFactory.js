"use strict";

app.factory("ItineraryFactory", function () {

  let itinerary = null;

  return {
      setItinerary:function (finalItinerary) {
        itinerary = finalItinerary;
      },
      getFinalItinerary:function () {
          return itinerary;
      }
  };
});


//have itinerary stored in factory
//to pass from itinerary generator to factory - call itinerary


//set itinerary and pass itinerary to itinerary factory
//get itinerary in factory that is then calledby ctrl for final itinerary partial
