/** @odoo-module **/
import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";

const SearchBarSnippet = publicWidget.Widget.extend({
  selector: ".js_search_bar",
  events: {
    "change #car_name": "_onCarChange",
    "change #car_model": "_onModelChange",
    "change #car_part": "_onPartChange",
  },

  start: function () {
    var def = this._super.apply(this, arguments);
    this._fetchData();
    return def;
  },

  _fetchData: function () {
    var self = this;
    return jsonrpc("/web_blocks/get_filter_data", {})
      .then(function (data) {
        self.data = data;
        self._populateCarOptions();
      });
  },

  _populateCarOptions: function () {
    const carSelect = this.el.querySelector("#car_name");
    carSelect.innerHTML = '<option value="">Select Car</option>';
    this.data.forEach((carObj) => {
      const carName = Object.keys(carObj)[0];
      const option = document.createElement("option");
      option.value = carName;
      option.textContent = carName;
      carSelect.appendChild(option);
    });
  },

  _onCarChange: function (ev) {
    const carName = ev.target.value;
    const modelSelect = this.el.querySelector("#car_model");
    const partSelect = this.el.querySelector("#car_part");

    modelSelect.innerHTML = '<option value="">Select Model</option>';
    partSelect.innerHTML = '<option value="">Select Part</option>';

    if (carName) {
      const carData = this.data.find((car) => car.hasOwnProperty(carName))[carName];
      Object.keys(carData).forEach((model) => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
      });
      modelSelect.disabled = false;
      partSelect.disabled = true;
    } else {
      modelSelect.disabled = true;
      partSelect.disabled = true;
    }
    this.el.querySelector("#part_details").innerHTML = "";
  },

  _onModelChange: function (ev) {
    const carName = this.el.querySelector("#car_name").value;
    const modelName = ev.target.value;
    const partSelect = this.el.querySelector("#car_part");

    partSelect.innerHTML = '<option value="">Select Part</option>';

    if (modelName) {
      const carData = this.data.find((car) => car.hasOwnProperty(carName))[carName];
      const modelData = carData[modelName];
      Object.keys(modelData).forEach((part) => {
        const option = document.createElement("option");
        option.value = part;
        option.textContent = part;
        partSelect.appendChild(option);
      });
      partSelect.disabled = false;
    } else {
      partSelect.disabled = true;
    }
    this.el.querySelector("#part_details").innerHTML = "";
  },

  _onPartChange: function (ev) {
    const carName = this.el.querySelector("#car_name").value;
    const modelName = this.el.querySelector("#car_model").value;
    const partName = ev.target.value;

    if (partName) {
      const carData = this.data.find((car) => car.hasOwnProperty(carName))[carName];
      const modelData = carData[modelName];
      const partData = modelData[partName];

      const detailsHtml = `
        <h3>Part Details:</h3>
        <p>Price: $${partData.price}</p>
        <p>Description: ${partData.description}</p>
      `;
      this.el.querySelector("#part_details").innerHTML = detailsHtml;
    } else {
      this.el.querySelector("#part_details").innerHTML = "";
    }
  },
});

publicWidget.registry.SearchBarSnippet = SearchBarSnippet;
