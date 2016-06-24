define([
  'jquery', 
  'underscore',
  'backbone', 
  'proj4leaflet'
], function($, _, Backbone, proj4L) {
  
  'use strict';

  var StateModel = Backbone.Model.extend({});

  var MapView = Backbone.View.extend({

    el: '#map',

    options: {
      map: {
        scrollWheelZoom: false,
        continuousWorld: true,
        worldCopyJump: false
      },
      cartodb: {
        user_name: 'dhakelila',
        css: '#score_test{ polygon-fill: #82bf72; polygon-opacity: 0.7; line-color: #f6faf9; line-width: 0.5; line-opacity: 1; }'
      }
    },

    initialize: function() {
      this._createMap();
    },

    _createMap: function() {
      var crs = new L.Proj.CRS(
        'EPSG:3786',
        '+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=6371007 +b=6371007 +units=m +no_defs',
        {
          resolutions: [
            131072, 65536, 32768, 16383, 4096, 2048, 1024, 512, 256, 128,
            64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125
          ],
          origin: [0, 0]
        });

      this.options.map.crs = crs;

      /* Here we create the map with Leafleft... */
      this.map = L.map(this.el, this.options.map);
      this.map.setView([90, 14.99], 1);

      this._activeLayer();
    },

    _activeLayer: function() {
      this._createLayer().done(_.bind(function() {
        //We remove the previous layer just when the new one arrive.
        //This way, we are sure we only have one layer at a time.

        this._addLayer();

        this.map.setView([90, 14.99], 1);
      }, this));
    },

    _createLayer: function() {
      var sql = this._getLayerQuery();
      var cartoAccount = this.options.cartodb.user_name;
      var cartoCss = this.options.cartodb.css || '#table_score_test{ polygon-fill: #FF6600; polygon-opacity: 0.7; line-color: #FFF; line-width: 0.5; line-opacity: 1; }';
      var deferred = $.Deferred();

      var request = {
        layers: [{
          'user_name': cartoAccount,
          'type': 'cartodb',
          'options': {
            'sql': sql,
            'cartocss': cartoCss,
            'cartocss_version': '2.3.0'
          }
        }]
      };

      $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        url: 'http://'+ cartoAccount +'.cartodb.com/api/v1/map/',
        data: JSON.stringify(request),
      }).done(_.bind(function(data) {
            var tileUrl = 'http://'+ cartoAccount +'.cartodb.com/api/v1/map/'+ data.layergroupid + '/{z}/{x}/{y}.png32';
            this._removeLayer();
            this.layer = L.tileLayer(tileUrl, {
              maxZoom: 14,
              minZoom: 0,
              continuousWorld: true
            });
            return deferred.resolve();
          }, this));

      return deferred;
    },

    _addLayer: function() {
      this.layer.addTo(this.map);
    },

    _removeLayer: function() {
      //TODO - Use something to be sure we are appending the right
      //layer. TimeStamp, loader...
      if (this.layer) {
        this.map.removeLayer(this.layer);
      }
    },

    _getLayerQuery: function() {

      var query = 'SELECT  cartodb_id,  cartodb_georef_status, iso, score,  st_transform(st_makevalid(the_geom_webmercator),3786) as the_geom_webmercator FROM  score_test';

      return query;
    },

  });

  return MapView;
});
