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
	  super();
          let shadowRoot = this.attachShadow({mode: "open"});
          shadowRoot.appendChild(template.content.cloneNode(true));
          this.$style = shadowRoot.querySelector('style');
          this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.dispatchEvent(event);  });
          this._props = {};
    }
    
    render(){
	  //var test1 = document.createElement('script');
    	  //test1.type = 'text/javascript';
    	  //test1.src = "https://cdn.amcharts.com/lib/4/core.js";
	  //const am4core = require(test1);
	    
	  //var test2 = document.createElement('script');
    	  //test2.type = 'text/javascript';
    	  //test2.src = "https://cdn.amcharts.com/lib/4/maps.js";  
	  //const am4maps = require(test2);
	  
	  //var test3 = document.createElement('script');
    	  //test3.type = 'text/javascript';
    	  //test3.src = "https://cdn.amcharts.com/lib/4/geodata/worldLow.js";
	  //const am4geodata_worldLow = require(test3);
	
	  if(this._firstConnection === 0){
	  	 var am4core = document.createElement('script');
    	 	 am4core.type = 'text/javascript';
    	 	 am4core.src = "https://cdn.amcharts.com/lib/4/core.js";
		  
		 var am4maps = document.createElement('script');
    	  	 am4maps.type = 'text/javascript';
    	  	 am4maps.src = "https://cdn.amcharts.com/lib/4/maps.js";  
		  
	  	var am4geodata_worldLow = document.createElement('script');
    	  	am4geodata_worldLow.type = 'text/javascript';
    	  	am4geodata_worldLow.src = "https://cdn.amcharts.com/lib/4/geodata/worldLow.js";		  
		  
		  async function LoadLibs(){
		  	try{
				await loadScript(am4core);
				await loadScript(am4maps);
				await loadScript(am4geodata_worldLow);
			}catct(e){
				alert(e);
			}finally{
				this._firstConnection = 1;
			}
		  
		  
		  }
		  
		  
		  
		  
	  }
	    
	
	//import * as am4core from 'https://cdn.amcharts.com/lib/4/core.js';
	//import * as am4maps from 'https://cdn.amcharts.com/lib/4/maps.js';
	//import * as am4geodata_worldLow from 'https://cdn.amcharts.com/lib/4/geodata/worldLow.js';
	
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
	this.render();
    }
  }
    customElements.define("com-dp-geomap", GeoMap);
})();
