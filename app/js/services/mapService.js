define([
  'jquery',
  'underscore',
  '../lib/cartoDBCollection'
], function($, _, CartoDBCollection) {

  'use strict';

  var MapService = CartoDBCollection.extend({

    // //Marker example
    markers: {
      "type": "FeatureCollection",
      "features": []
    },

    defaultFeature: {
      "type": "Feature",
      "properties": {
        "title": "",
        "description": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.7, 40.41]
      }
    },

    initialize: function() {},

    getMarkers: function() {
      var data = this.models;

      _.each(data, _.bind(function(i){
        var newmarker = _.clone(this.defaultFeature);
        
        newmarker.properties.title = i.get('name');
        newmarker.properties.description = i.get('description');
        newmarker.geometry = i.get('geometry');

        this.markers.features.push(newmarker);
      }, this));

      return this.markers

    }
  });

  return MapService;
});
