(function () {
    let template = document.createElement("template");
    template.innerHTML = '
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
		</style>
		
    <body>
      <div id="regions_div" style="width: 900px; height: 500px;"></div>
    </body>
    ';

    class GeoMap extends HTMLElement {
        constructor() {
          let shadowRoot = this.attachShadow({mode: "open"});
          shadowRoot.appendChild(template.content.cloneNode(true));
          this.$style = shadowRoot.querySelector('style');			
          this.$svg = shadowRoot.querySelector('svg');
          this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.dispatchEvent(event);  });
          this._props = {};
    }

    render(){
      import google from https://www.gstatic.com/charts/loader.js
      google.charts.load('current', {
             'packages':['geomap'],
             // Note: you will need to get a mapsApiKey for your project.
             // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
             'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
           });
           google.charts.setOnLoadCallback(drawMap);

    }

    drawMap(){
      var data = google.visualization.arrayToDataTable([
                ['Country', 'Popularity'],
                ['Germany', 200],
                ['United States', 300],
                ['Brazil', 400],
                ['Canada', 500],
                ['France', 600],
                ['RU', 700]
              ]);
      
              var options = {};
              options['dataMode'] = 'regions';
      
              var container = document.getElementById('regions_div');
              var geomap = new google.visualization.GeoMap(container);
      
              geomap.draw(data, options);
            };
    }
    
    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }
    onCustomWidgetAfterUpdate(changedProperties) {
        if ("color" in changedProperties) {
            this.style["background-color"] = changedProperties["color"];
        }
        if ("opacity" in changedProperties) {
            this.style["opacity"] = changedProperties["opacity"];
        }
    }
    customElements.define("com-dp-geomap", GeoMap);
})();
