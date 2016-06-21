define([
  'jquery', 
  'backbone',
  '../templates/dashboardSortingTpl.handlebars'
], function($, Backbone, tpl) {
  
  'use strict';

  var StateModel = Backbone.Model.extend({});

  var DashboardSortingView = Backbone.View.extend({

    el: '#dashboardSorting',

    events: {
    },

    initialize: function() {
      this.state = new StateModel();
      this.render();
    },

    render: function() {
      this.$el.html(tpl);
    }

  });

  return DashboardSortingView;
});
