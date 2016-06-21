//This is my mediator
define([
  'jquery', 
  'backbone',
  './routers/router',
  './views/mapView',
  './views/dashboardFiltersView',
  './views/dashboardListView',
  './views/dashboardSortingView',
  './views/dashboardCounterView',
  './templates/mapAppTemplate.handlebars'
], function($, Backbone, Router, MapView, DashboardFilterView, DashboardListView, DashboardSortingView, DashboardCounterView,  template) {
  
  'use strict';

  var AppView = Backbone.View.extend({

    el: '#mapApp',

    initialize: function() {
      this.render();

      //Router
      this.router = new Router();
      
      //Map
      this.map = new MapView();
      
      //Dashboard
      this.dashboardFilters = new DashboardFilterView();
      this.dashboardList = new DashboardListView();
      this.dashboardSorting = new DashboardSortingView();
      this.dashboardCounter = new DashboardCounterView();

      this._setListeners();
    },

    _setListeners: function() {
      this._setMapListeners();
      this._setRouterListeners();
      this._setDashboardListeners();
    },

    render: function() {
      this.$el.html( template );

      this._initApp();
    },

    _initApp: function() {
      Backbone.history.start({ pushState: false });
    },

    _setRouterListeners: function() {
      this.listenTo(this.router.state, 'change:params', this._doSomething);
    },

    _setMapListeners: function() {
      this.listenTo(this.map.state, 'change', this._somethingNew);
    },

    _setDashboardListeners: function() {
      //Filters
      this.listenTo(this.dashboardFilters.state, 'change:filter', this._setFilter);

      //List

      //Sorting

      //Counter
    },


    _setFilter: function() {
      var filter = this.dashboardFilters.state.get('filter');
      
      this.dashboardList.state.set('filter', filter);
      this.map.state.set('filter', filter);
    },

    _somethingNew: function() {
      
    },

    _doSomething: function() {

    }
  });

  return AppView;
});

