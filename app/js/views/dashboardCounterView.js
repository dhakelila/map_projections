define([
  'jquery', 
  'backbone',
  '../templates/dashboardCounterTpl.handlebars'
], function($, Backbone, tpl) {
  
  'use strict';

  var StateModel = Backbone.Model.extend({});

  var DashboardCounterView = Backbone.View.extend({

    el: '#dashboardCounter',

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

  return DashboardCounterView;
});
