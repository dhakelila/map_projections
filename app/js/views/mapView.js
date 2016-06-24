define([
  'jquery', 
  'underscore',
  'backbone'
], function($, _, Backbone) {
  
  'use strict';

  var StateModel = Backbone.Model.extend({});

  var MapView = Backbone.View.extend({

    el: '#map',

    options: {
        basemap: 'https://api.tiles.mapbox.com/v4/goal16.9990f1b9/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ29hbDE2IiwiYSI6ImNpcGgzaWwzbDAwMW52Mmt3ZG5tMnRwN3gifQ.-e8de3rW2J8gc2Iv3LzMnA',
        map: {
          center: [39.1, 4.5],
          zoom: 2,
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
      /* this is the definition for basemap */
      var baseMap = L.tileLayer(this.options.basemap, {
        attribution: '<a href="https://www.mapzen.com/rights">Attribution.</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'
      });

      /* Here we create the map with Leafleft... */
      this.map = L.map(this.el, this.options.map);
      /* ...and we add the basemap layer with Leaflet as well */
      this.map.addLayer(baseMap);

      this._activeLayer();
    },

    _activeLayer: function() {
      this._createLayer().done(_.bind(function() {
        this._addLayer();
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
            this.layer = L.tileLayer(tileUrl, { noWrap: true });
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

       var query = 'SELECT  cartodb_id, cartodb_georef_status, iso, score,  st_transform(st_makevalid(the_geom_webmercator), 54030) as the_geom_webmercator FROM  score_test';

      return query;
    },

  });

  return MapView;
});
