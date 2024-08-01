// import { renderToElement } from "@web/core/utils/render";
// import publicWidget from "@web/legacy/js/public/public_widget";

// const SearchBarSnippet = publicWidget.Widget.extend({
//   selector: ".s_search_bar",
//   disabledInEditableMode: false,
//   init() {
//     this._super(...arguments);
//     this.rpx = this.bindService("rpc");
//   },
//   async willStart(){
//     await this._super(...arguments);
//     const filterData = await this.rpc("/web_blocks/get_filter_data");
//   },
//   async start() {
//     this.filterElement = rendertoElement("web_blocks.s_search_bar", {widget: this});
//     const 
//   }
// })


odoo.define("web_blocks.search_bar", function (require) {
  "use strict";

  var publicWidget = require("web.public.widget");
  var rpc = require("web.rpc");

  publicWidget.registry.SearchBar = publicWidget.Widget.extend({
    selector: ".pt40.pb49",
    start: function () {
      this._super.apply(this, arguments);
      this._fetchData();
    },
    _fetchData: function () {
      var self = this;
      rpc
        .query({
          route: "/web_blocks/get_filter_data",
        })
        .then(function (data) {
          self._populateDropdowns(data);
        });
    },
    _populateDropdowns: function (data) {
      var carSelect = $("#car_name");
      carSelect.append('<option value="">Select Car</option>');
      for (var i = 0; i < data.length; i++) {
        var car = Object.keys(data[i])[0];
        carSelect.append('<option value="' + car + '">' + car + "</option>");
      }

      var modelSelect = $("#year_model");
      modelSelect.append('<option value="">Select Model</option>');

      var partSelect = $("#available_parts");
      partSelect.append('<option value="">Select Part</option>');

      this._bindEvents(data);
    },
    _bindEvents: function (data) {
      var self = this;
      $("#car_name").on("change", function () {
        self._onCarNameChange(data);
      });
      $("#year_model").on("change", function () {
        self._onYearModelChange(data);
      });
    },
    _onCarNameChange: function (data) {
      var carName = $("#car_name").val();
      var modelSelect = $("#year_model");
      modelSelect.empty();
      modelSelect.append('<option value="">Select Model</option>');

      if (carName) {
        var carData = data.find((car) => car[carName]);
        var models = carData[carName];
        for (var model in models) {
          modelSelect.append(
            '<option value="' + model + '">' + model + "</option>"
          );
        }
      }
    },
    _onYearModelChange: function (data) {
      var carName = $("#car_name").val();
      var modelName = $("#year_model").val();
      var partSelect = $("#available_parts");
      partSelect.empty();
      partSelect.append('<option value="">Select Part</option>');

      if (carName && modelName) {
        var carData = data.find((car) => car[carName]);
        var parts = carData[carName][modelName];
        for (var part in parts) {
          partSelect.append(
            '<option value="' + part + '">' + part + "</option>"
          );
        }
      }
    },
  });

  return publicWidget.registry.SearchBar;
});
