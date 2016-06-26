define([
  'jquery',
  'underscore',
  'backbone',
  './format', 
  '../config.json'
], function($, _, Backbone, format, CONFIG) {

  'use strict';

  var BASE_URL = "http://{0}.cartodb.com/api/v2/sql";

  var CartoDBModel = Backbone.Model.extend({

    user_name: CONFIG.cartodb.user_name,

    url: function() {
      return format(BASE_URL, this.user_name) + "?q=" + this._getQuery();
    },

    _getQuery: function() {
      var columns = "*";
      if (this.columns !== undefined && this.columns.length > 0) {
        columns = this.columns.join(", ");
      }

      var where = "";
      if (this.id !== undefined) {
        var id_field = this.id_field || 'id';

        var id = this.id;
        if (_.isString(id)) { id = "'"+id+"'"; }

        where = "WHERE " + id_field + "=" + id;
      }

      return format("SELECT {0} FROM {1} {2}", columns, this.table, where);
    },

    parse: function(data) {
      return data.rows[0];
    }
  });

  return CartoDBModel;
});
