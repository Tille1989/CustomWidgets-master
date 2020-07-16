(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
        <script id="sap-ui-bootstrap"
            src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
            data-sap-ui-theme="sap_belize"
            data-sap-ui-resourceroots='{
                "sap.m.sample.GenericTileAsKPITile": "./",
                "sap.ui.demo.mock": "mockdata"
            }'
            data-sap-ui-compatVersion="edge"
            data-sap-ui-async="true"
            data-sap-ui-frameOptions="trusted"
            data-sap-ui-oninit="module:sap/ui/core/ComponentSupport">
        </script>

        <style>
            html, body { height: 100%; }
        </style>

    <body class="sapUiBody sapUiSizeCozy" id="content">
        <div data-sap-ui-component
            data-name="sap.m.sample.GenericTileAsKPITile"
            data-height="100%"
            data-id="container"
            data-settings='{"id" : "sap.m.sample.GenericTileAsKPITile"}'
            style="height: 100%">
        </div>
        <mvc:View controllerName="sap.m.sample.GenericTileAsKPITile.Page" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc">
            <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Country-Specific Profit Margin" subheader="Expenses" press="onPress">
                <TileContent unit="EUR" footer="Current Quarter">
                    <NumericContent scale="M" value="1.96" valueColor="Error" indicator="Up" withMargin="false" />
                </TileContent>
            </GenericTile>
        </mvc:View>        
    </body>
    `;
    class SacKpiTile extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
            this._props = {};
        }
        
    }
    customElements.define("com-sap-sample-sackpitile", SacKpiTile);
})();
