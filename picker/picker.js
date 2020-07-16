(function() { 
    let _shadowRoot;

    let template = document.createElement("template");
    template.innerHTML = `
    <script id="sap-ui-bootstrap"
        src="https://sapui5.hana.ondemand.com/sdk/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_belize"
        data-sap-ui-compatVersion="edge"
        data-sap-ui-async="true"
        data-sap-ui-frameOptions="trusted">
    </script>

    <div id="ui5_content" name="ui5_content">
        <slot name="content"></slot>
    </div>

    <script id="oView" name="oView" type="sapui5/xmlview">  
        <mvc:View
            controllerName="myView.Template"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns:l="sap.ui.layout"
            xmlns="sap.m">
            <l:VerticalLayout
					class="sapUiContentPadding"
                    width="100%">
            <l:content>                    
                <DatePicker
                        id="DP1"
                        displayFormat="MM-y"
                        change="handleChange"
                        class="sapUiSmallMarginBottom"/>
            </l:content>
            </l:VerticalLayout>                        
        </mvc:View>
    </script>        
    `;
    class Picker extends HTMLElement {
        constructor() {
            super(); 
            _shadowRoot = this.attachShadow({mode: "open"});
            _shadowRoot.appendChild(template.content.cloneNode(true));

            _shadowRoot.querySelector("#oView").id = _id + "_oView";

            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
            
            this._props = {};
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            loadthis(this);
        }        
    }
    customElements.define("com-sap-sample-picker", Picker);

    // UTILS
    function loadthis(that) {
        var that_ = that;
      
        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.define([
            'sap/ui/core/mvc/Controller',
            'sap/ui/model/json/JSONModel',
            "sap/ui/core/Core",
            "sap/ui/core/library",
            "sap/ui/unified/library",
            "sap/ui/unified/DateTypeRange"
        ], function(Controller, JSONModel, Core, CoreLibrary, UnifiedLibrary, DateTypeRange) {
            "use strict";
            var CalendarDayType = UnifiedLibrary.CalendarDayType,
                ValueState = CoreLibrary.ValueState;
        
            return Controller.extend("sap.m.sample.DatePicker.Group", {
        
                onInit: function () {
                    // create model
                    var oModel = new JSONModel();
                    oModel.setData({
                        dateValue: new Date()
                    });
                    this.getView().setModel(oModel);
        
                    this.byId("DP1").setDateValue(new Date());
                    
                    this._iEvent = 0;
        
                    // for the data binding example do not use the change event for check but the data binding parsing events
                    Core.attachParseError(
                            function(oEvent) {
                                var oElement = oEvent.getParameter("element");
        
                                if (oElement.setValueState) {
                                    oElement.setValueState(ValueState.Error);
                                }
                            });
        
                    Core.attachValidationSuccess(
                            function(oEvent) {
                                var oElement = oEvent.getParameter("element");
        
                                if (oElement.setValueState) {
                                    oElement.setValueState(ValueState.None);
                                }
                            });
                },
        
                handleChange: function (oEvent) {
                    var oText = this.byId("textResult"),
                        oDP = oEvent.getSource(),
                        sValue = oEvent.getParameter("value"),
                        bValid = oEvent.getParameter("valid");
        
                    this._iEvent++;
                    oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);
        
                    if (bValid) {
                        oDP.setValueState(ValueState.None);
                    } else {
                        oDP.setValueState(ValueState.Error);
                    }
                },
        
                handleBtnPress: function (oEvent) {
                    var oText = this.byId("textResult2"),
                        oDP = this.byId("DP9");
        
                    oText.setText("Value is: " + ((oDP.isValidValue()) ? "valid" : "not valid"));
                }
            });
        
        });
    }


})();
