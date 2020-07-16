(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
        :host {
            border-radius: 25px;
            border-width: 4px;
            border-color: black;
            border-style: solid;
            display: block;
        } 
        </style> 
    `;
    class ScreenResolution extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));

            connectedCallback() {
                var screenSize = getResolution();
                if (screenSize != this.screenSize) {
                    this.screenSize = screenSize;

                    this.dispatchEvent(new CustomEvent("propertiesChanged", {
                        detail: {
                            properties: {
                                screenSize: screenSize
                            }
                        }
                    }));
                } 
            }
            this._props = {};
        }
        
    }
    customElements.define("com-sap-sample-screenresolution", ScreenResolution);
    // Functions
    function getResolution() {
        return [screen.width, screen.height];
    }
})();
