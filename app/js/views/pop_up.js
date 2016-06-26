define([
  'jquery', 
  'underscore',
  'backbone',
  '../models/pop_up.js',
  '../templates/pop_up.handlebars'
], function($, _, Backbone, PopUpModel, popUpTemplate) {
  
  'use strict';

  var PopUpView = Backbone.View.extend({

    initialize: function(options) {
      this.options = options;
      this.model = new PopUpModel();
      this._initData();
    },

    _initData: function() {
      this.model.fetch(this.options).done(_.bind(function(response) {
        //We need to check if response is empty to not draw pop-up in that case.
        if ( Object.keys(response).length ) {
          this.options.data = this.model;
          this.options.mobile ?  this._drawPopUpMobile() : this._drawPopUp();
        } else {
          this.model.clear();
        }
      }, this));
    },

    _drawPopUpMobile: function() {
      this.popUp = this._getContent(this.options);
      $('body').append(this.popUp);
      $("#popup-background").css("display","block");
      $('.btn-close').on('click', this._closeInfowindow.bind(this));
    },

    _drawPopUp: function() {
      this.popUp = L.popup({closeButton: false})
        .setLatLng(this.options.latLng)
        .setContent(this._getContent(this.options))
        .openOn(this.options.map);

      this.setEvents();
    },

    setEvents: function() {
      $('.btn-close').on('click', this.closePopUp.bind(this))
    },

    closePopUp: function() {
      this.options.map.closePopup();
      Backbone.Events.trigger('popUp:close');
    },

    _closeInfowindow: function() {
      $('.btn-close').off('click');
      $('.m-popup').remove();
      $("#popup-background").css("display","none");
    },

    _getContent: function(options) {
      return popUpTemplate();
    },

  });

  return PopUpView;
});
