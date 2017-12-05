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
