define([
  'jquery',
  'backbone'
], function($, Backbone) {

  'use strict';

  var CartoDBCollection = Backbone.Collection.extend({

    url: '../data/projects.json',

    initialize: function() {
    }
  });

  return CartoDBCollection;
});
