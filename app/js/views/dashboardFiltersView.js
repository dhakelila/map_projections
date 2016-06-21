define([
  'jquery', 
  'underscore',
  'backbone',
  '../services/dashboardService',
  '../templates/dashboardFiltersTpl.handlebars'
], function($, _, Backbone, DashboardService, tpl) {
  
  'use strict';

  var StateModel = Backbone.Model.extend({});

  var DashboardFilterView = Backbone.View.extend({

    el: '#dashboardFilters',

    events: {
      'change select' : '_setData'
    },

    initialize: function() {
      this.state = new StateModel();
      this.collection = new DashboardService();
      this.collection.fetch().done(_.bind(function() {
        this.render();
      }, this));
    },

    render: function() {
      this.$el.html(tpl({ 'projects': this.collection.toJSON() }));
    },

    _setData: function(e) {
      var type = $(e.currentTarget).attr('id');
      var option = $(e.currentTarget).val();

      var filter = {};
      filter[type] = option;

      this.state.set( 'filter', filter );
    }

  });

  return DashboardFilterView;
});
