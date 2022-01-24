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
	    
    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }
    onCustomWidgetAfterUpdate(changedProperties) {

    }
    customElements.define("com-dp-geomap", GeoMap);
})();
