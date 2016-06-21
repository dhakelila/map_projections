//This is my mediator
define([
  'jquery', 
  'backbone',
  './routers/router',
  './views/mapView'
], function($, Backbone, Router, MapView) {
  
  'use strict';

  var AppView = Backbone.View.extend({

    initialize: function() {

      //Router
      this.router = new Router();
      
      //Map
      this.map = new MapView();
    },

    _initApp: function() {
      Backbone.history.start({ pushState: false });
    }
  });

  return AppView;
});

