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
		
		#map {
			height: 500px;
			width: 500px;
		}
		</style>
		
		<body>
		<div id="map"></div>
		</body>
    ';

    class GeoMap extends HTMLElement {
        constructor() {
          let shadowRoot = this.attachShadow({mode: "open"});
          shadowRoot.appendChild(template.content.cloneNode(true));
          this.$style = shadowRoot.querySelector('style');
          this.$body = shadowRoot.querySelector('body');
          this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.dispatchEvent(event);  });
          this._props = {};
    }

    render(){
	var location = {lat: -25.393, lng: 131.044};
	var map = new google.maps.Map(document.getElementById("map"), { zoom: 4, center: location });
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
