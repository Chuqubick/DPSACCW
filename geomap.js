(function () {
    let template = document.createElement("template");
    template.innerHTML =  `
		<style>
		:host {
			border-radius: 10px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		}

		body {
			background: #fff;
		}
		
		#chartdiv { 
			width: 100%;
			height: 200px;
  			margin: 1em;
		}
		<div id="chartdiv"></div>
		</style>
     `;

    class GeoMap extends HTMLElement {
        constructor() {
          let shadowRoot = this.attachShadow({mode: "open"});
          shadowRoot.appendChild(template.content.cloneNode(true));
          this.$style = shadowRoot.querySelector('style');
          this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.dispatchEvent(event);  });
          this._props = {};
    }
    
    render(){
	import * as am4core from "https://cdn.amcharts.com/lib/4/core.js";
	import * as am4maps from "https://cdn.amcharts.com/lib/4/maps.js";
	import * as am4geodata_worldLow from "https://cdn.amcharts.com/lib/4/geodata/worldLow.js";
	var chart = am4core.create("chartdiv", am4maps.MapChart);
	chart.geodata = am4geodata_worldLow;
	chart.projection = new am4maps.projections.Orthographic();
	chart.deltaLatitude = -30;
	chart.marginTop = 20;
	chart.marginBottom = 20;
    }
	    
    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }
    onCustomWidgetAfterUpdate(changedProperties) {

    }
    customElements.define("com-dp-geomap", GeoMap);
})();
