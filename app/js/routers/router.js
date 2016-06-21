define([
  'jquery', 
  'backbone'
], function($, Backbone) {
  
  'use strict';

  var StateModel = Backbone.Model.extend({});

  var Router = Backbone.Router.extend({

    routes: {
      '(/)(:params)' : '_home'
    },

    initialize: function() {
      this.state = new StateModel();
    },

    _home: function(params) {
      if (params) {
        this.state.set({ 'params': params });
      } 
    }

  });

  return Router;
});
