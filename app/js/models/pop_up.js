define([ 
  'underscore',
  'backbone',
  '../lib/format',
  '../lib/cartodb_model.js',
  '../queries/pop_up.handlebars'
], function( _, Backbone, format, CartoDBModel, popUpSQL) {
  
  'use strict';

  var PopUp = CartoDBModel.extend({

    _getQuery: function() {
      return popUpSQL();
    },

  });

  return PopUp;
});

