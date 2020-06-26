sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/Table",
	"sap/viz/ui5/controls/VizFrame",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel, Table, VizFrame, Spreadsheet, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("LMBR_CUSTOMER_APP.note_emission_time.controller.V0", {

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Format Period
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		_formatPeriod: function (input) {
			var vOutput = "";
			var vYear = input.substring(2, 4);
			var vMonth = input.substring(4, 6);

			switch (vMonth) {

			case "01":
				vOutput = "Jan-" + vYear;
				break;
			case "02":
				vOutput = "Fev-" + vYear;
				break;
			case "03":
				vOutput = "Mar-" + vYear;
				break;
			case "04":
				vOutput = "Abr-" + vYear;
				break;
			case "05":
				vOutput = "Mai-" + vYear;
				break;
			case "06":
				vOutput = "Jun-" + vYear;
				break;
			case "07":
				vOutput = "Jul-" + vYear;
				break;
			case "08":
				vOutput = "Ago-" + vYear;
				break;
			case "09":
				vOutput = "Set-" + vYear;
				break;
			case "10":
				vOutput = "Out-" + vYear;
				break;
			case "11":
				vOutput = "Nov-" + vYear;
				break;
			case "12":
				vOutput = "Dez-" + vYear;
				break;
			}

			return vOutput;
		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Remove duplicated records from Array informed
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		_removeDuplicates: function (originalArray, prop) {
			var newArray = [];
			var lookupObject = {};

			for (var i in originalArray) {

				// If 'prop' is not informed, ckeck all record
				if (prop)
					lookupObject[originalArray[i][prop]] = originalArray[i];
				else
					lookupObject[originalArray[i]] = originalArray[i];
			}

			for (i in lookupObject) {
				newArray.push(lookupObject[i]);
			}
			return newArray;
		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Default Settings
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		_defaultSettings: function (oJsonModel) {

			var oSettings = {};

			// Get YYYYMM fo Current Date
			var vTodayTo = new Date();
			var vDateTo = vTodayTo.getFullYear() +
				("00" + (vTodayTo.getMonth() + 1)).slice(-2);

			// Get YYYYMM fo Current Date subtrating 5 months
			var vTodayFrom = vTodayTo;
			vTodayFrom.setMonth(vTodayTo.getMonth() - 5);
			var vDateFrom = vTodayFrom.getFullYear() +
				("00" + (vTodayFrom.getMonth() + 1)).slice(-2);

			var result = {};
			result.dateFrom = vDateFrom;
			result.dateTo = vDateTo;

			// Activate Busy Control for Panel			
			oSettings.panelBusy = true;

			// Date From and Date TO
			oSettings.dateFrom = vDateFrom;
			oSettings.dateTo = vDateTo;

			oJsonModel.setProperty("/Settings", oSettings);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Fill Dynamic Content From OData
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		_fillDynamicContentFromOData: function (oArrayResults, oJsonModel) {

			// Get Unique Occurrence for PLANT field, generating new Array
			var uniquePlantArray = [];
			var internalPlantArray = this._removeDuplicates(oArrayResults, "Plant");
			for (var i = 0; i < internalPlantArray.length; i++)
				uniquePlantArray.push(internalPlantArray[i]['Plant']);
			oJsonModel.setProperty("/BackEndTableDataByPlant", uniquePlantArray);

			// Get Unique Occurrence for PERIOD field, generating new Array
			var uniquePeriodArray = [];
			var internalPeridArray = this._removeDuplicates(oArrayResults, "Period");
			for (i = 0; i < internalPeridArray.length; i++)
				uniquePeriodArray.push(this._formatPeriod(internalPeridArray[i]['Period']));
			oJsonModel.setProperty("/BackEndTableDataByPeriod", uniquePeriodArray);

			/* Run for PLANT and generate a Array with records with Fields:
			- plant:  Plant
			- categ:  Plant Category
			- region: Region
			- name:   Plant Description
			- YYYY-MM_qty  : Period Quantity
			- YYYY-MM-time : Period Average Time
			- Average Time     */
			var newArray = [];
			var dynColumns = [];
			var dynColumnsQty = [];
			var dynColumnsTime = [];
			for (i = 0; i < internalPlantArray.length; i++) {

				// New Element for Array
				var newElement = {};
				newElement['plant'] = internalPlantArray[i]['Plant'];
				newElement['categ'] = internalPlantArray[i]['PlantCateg'];
				newElement['region'] = internalPlantArray[i]['Region'];
				newElement['name'] = internalPlantArray[i]['Name'];

				// Run for PERIOD
				for (var j = 0; j < internalPeridArray.length; j++) {

					// Search Record on Array
					var result = {};
					for (var k = 0; k < oArrayResults.length; k++) {
						if (oArrayResults[k]['Plant'] === internalPlantArray[i]['Plant'] &&
							this._formatPeriod(oArrayResults[k]['Period']) === this._formatPeriod(internalPeridArray[j]['Period'])) {
							result = oArrayResults[k];
							break;
						}
					}

					// Fill Dynamic for QUANTITY
					var dynQty = 0;
					if (result.hasOwnProperty("Qty"))
						dynQty = result["Qty"];
					var fieldForQty = this._formatPeriod(internalPeridArray[j].Period) + "-qty";
					newElement[fieldForQty] = dynQty;

					// Insert Dynamic Collumns (QTY)
					dynColumns.push(fieldForQty);
					dynColumnsQty.push(fieldForQty);

					// Fill Dynamic for TIME
					var dynTime = 0;
					if (result.hasOwnProperty("AvgTime"))
						dynTime = result["AvgTime"];
					var fieldForTime = this._formatPeriod(internalPeridArray[j].Period) + "-time";
					newElement[fieldForTime] = dynTime;

					// Insert Dynamic Collumns (TIME)
					dynColumns.push(fieldForTime);
					dynColumnsTime.push(fieldForTime);
				}

				// Fill new Record
				newArray.push(newElement);
			}

			// Set Dynamic collumns (ALL)
			dynColumns = this._removeDuplicates(dynColumns);
			oJsonModel.setProperty("/DynCollumns", dynColumns);

			// Set Dynamic collumns (QTY)
			dynColumnsQty = this._removeDuplicates(dynColumnsQty);
			oJsonModel.setProperty("/DynCollumnsQty", dynColumnsQty);

			// Set Dynamic collumns (TIME)
			dynColumnsTime = this._removeDuplicates(dynColumnsTime);
			oJsonModel.setProperty("/DynCollumnsTime", dynColumnsTime);

			// Set Table Content for Grid Table Display
			oJsonModel.setProperty("/TableContent", newArray);

			// Generate Dynamic Table on VBOX
			this._dynamicViewTable(oJsonModel);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Get data from BackEnd Service
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_get_backend_data: function (oJsonModel, oDataModel) {

			// Set Default Settings
			this._defaultSettings(oJsonModel);

			var self = this;

			// Callback para SUCCESS
			function onSuccess(oData, response) {

				// New Property for TableData
				oJsonModel.setProperty("/BackEndTableData", oData.results);

				// Fill Content from OData Service
				self._fillDynamicContentFromOData(oData.results, oJsonModel);

				// Desativate Busy Control
				var oSettings = oJsonModel.getProperty("/Settings");
				oSettings.panelBusy = false;
				oJsonModel.setProperty("/Settings", oSettings);

				console.log("===> Sucess on OData Read");

			}

			// Callback para ERROR
			function onError(oError) {

				// Compose Message
				var vMsg = this.getView().getModel("i18n").getProperty("MessageSelectedDataError") + oError.responseText;

				MessageBox.error(vMsg);
				console.log("===> Error on OData Read");

			}

			// Parameters
			var oParam = {
				success: onSuccess.bind(this),
				error: onError.bind(this)
			};

			// Fill Path to READ OData Service, filling DateFrom and DateTo content
			var oSettings = oJsonModel.getProperty("/Settings");
			var vPath = "/P(IP_Date_From='" + oSettings.dateFrom + "',IP_Date_To='" + oSettings.dateTo + "')/Results?$format=json";
			oDataModel.read(vPath, oParam);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Generate Dinamic Table for Xml View
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_dynamicViewTable: function (oJsonModel) {

			// Reference of Controller
			var _self = this;

			// Visible Row Cound Control
			var visibleRowCount = 0;
			if (oJsonModel.getProperty("/TableContent").length > 15)
				visibleRowCount = 15;
			else
				visibleRowCount = oJsonModel.getProperty("/TableContent").length;

			// Generate New Table
			var oTable = new Table("GridTable", {
				selectionMode: "MultiToggle",
				visibleRowCount: visibleRowCount,
				enableSelectAll: true,
				alternateRowColors: true
			});
			
			// Add Extension (Button)
			oTable.addExtension(new sap.m.Button("ResetSelection", {
				icon: "sap-icon://reset",
				tooltip: "{i18n>buttResetSelectionTooTip}",

				press: function (oEvent) {
					_self._onPressResetSelection(oEvent);
				}
			}));

			// Column for "PLANTS"
			var oTextPlant = new sap.m.Text({
				text: "{displayData>plant}",
				wrapping: false
			});
			var oCol1 = new sap.ui.table.Column().setTemplate(oTextPlant);
			oCol1.setAutoResizable(true);
			oCol1.setWidth("4.5rem");
			oCol1.setSortProperty("plant");
			oCol1.setFilterProperty("plant");
			oCol1.setShowFilterMenuEntry(true);
			oCol1.setShowSortMenuEntry(true);
			oCol1.setLabel(new sap.m.Label({
				text: "Centros"
			}));
			oTable.addColumn(oCol1);
			oTable.setFixedColumnCount(0);

			// Column for "Categ"
			var oTextCateg = new sap.m.Text({
				text: "{displayData>categ}",
				wrapping: false
			});
			var oCol2 = new sap.ui.table.Column().setTemplate(oTextCateg);
			oCol2.setAutoResizable(true);
			oCol2.setWidth("4rem");
			oCol2.setSortProperty("categ");
			oCol2.setFilterProperty("categ");
			oCol2.setShowFilterMenuEntry(true);
			oCol2.setShowSortMenuEntry(true);
			oCol2.setLabel(new sap.m.Label({
				text: "Categ."
			}));
			oTable.addColumn(oCol2);

			// Column for "Name"
			var oTextName = new sap.m.Text({
				text: "{displayData>name}",
				wrapping: false
			});
			var oCol3 = new sap.ui.table.Column().setTemplate(oTextName);
			oCol3.setAutoResizable(true);
			oCol3.setWidth("16rem");
			oCol3.setSortProperty("name");
			oCol3.setFilterProperty("name");
			oCol3.setShowFilterMenuEntry(true);
			oCol3.setShowSortMenuEntry(true);
			oCol3.setLabel(new sap.m.Label({
				text: "Name"
			}));
			oTable.addColumn(oCol3);

			// Column for "Region"
			var oTextRegion = new sap.m.Text({
				text: "{displayData>region}",
				wrapping: false
			});
			var oCol4 = new sap.ui.table.Column().setTemplate(oTextRegion);
			oCol4.setAutoResizable(true);
			oCol4.setWidth("4rem");
			oCol4.setSortProperty("region");
			oCol4.setFilterProperty("region");
			oCol4.setShowFilterMenuEntry(true);
			oCol4.setShowSortMenuEntry(true);
			oCol4.setLabel(new sap.m.Label({
				text: "Region"
			}));
			oTable.addColumn(oCol4);

			// Save Controller for internal reference
			oTable.attachRowSelectionChange(function (oEvent) {
				_self._onRowSelectionChange(oEvent);
			});
			oTable.bindRows("displayData>/TableContent");

			// Get VBox by ID and insert new Elements
			var oVBox = this.getView().byId("TableVBox");
			oVBox.removeAllItems();
			oVBox.addItem(oTable);
		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Generate Dinamic Chart for Xml View
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_dynamicViewChart: function (oTable, oJsonModel) {

			// Get VBox by ID and remove all elements already
			var oVBox = this.getView().byId("ChartVBox");
			oVBox.removeAllItems();

			// Color Pallet following Fiori Themes "Belize (light flavor)"
			var _colorPalletTheming = [
				// Qualitative Palette (11 Colors)
				"#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4",
				"#525DF4", "#BF399E", "#6C8893", "#EE6868", "#2F6497",

				// Semantic Palette Dark to Light
				"#f5aa85", "#d5dadc", "#8fd1bb", "#fcc3a7", "#b2d4f5",
				"#9ea8ad", "#ef8d5d", "#74abe2", "#bac1c4", "#66c2a3",
				"#da5a1b", "#848f94", "#19A979", "#E8743B", "#5899DA",
				"#596468", "#cc4300", "#1866b4", "#69767c", "#0e8c62"
			];
			var limitColor = "#b2d4f5";
			var _primaryAxis = [];
			var _colorPallet = [];

			// Get Selected Lines
			var _selectedLines = oTable.getSelectedIndices();
			if (_selectedLines.length < 1)
				return;

			// Define Color and PrimaryAxis for ChartDisplay
			for (var h = 0; h < _selectedLines.length; h++) {
				_colorPallet.push(_colorPalletTheming[h]);
				_primaryAxis.push("line");
			}
			_colorPallet.push(limitColor);
			_primaryAxis.push("bar");

			// Fill Measures properties based on Selected Lines
			var measureQtyArray = [];
			var measureTimeArray = [];
			var measureAxisArray = [];
			for (var i = 0; i < _selectedLines.length; i++) {

				// Get record based on selected index
				var selectedLine = oJsonModel.getProperty(
					oTable.getContextByIndex(_selectedLines[i]).sPath);

				// Measure (QTY)
				var measureQtyElement = {};
				measureQtyElement["name"] = selectedLine.plant;
				measureQtyElement["value"] = "{qty" + selectedLine.plant + "}";
				measureQtyArray.push(measureQtyElement);

				// Measure (TIME)
				var measureTimeElement = {};
				measureTimeElement["name"] = selectedLine.plant;
				measureTimeElement["value"] = "{time" + selectedLine.plant + "}";
				measureTimeArray.push(measureTimeElement);

				// Measure Axis
				measureAxisArray.push(selectedLine.plant);
			}

			//------------------------------------------------------------
			// Chart For QUANTITY
			//-----------------------------------------------------------
			// Generate New VizFrame instance (for QTY)
			var oVizFrameQty = new VizFrame({
				"vizType": "line",
				"width": "100%"
			});

			// Set Properties
			oVizFrameQty.setVizProperties({
				title: {
					text: "Quantidade"
				},

				plotArea: {

					// Color Pallet following "Belize (light flavor)" in Sequentuial Pallet
					colorPalette: _colorPallet,

					dataLabel: {
						visible: false
					},

					background: {
						color: "transparent"
					}
				},
				legend: {
					title: {
						visible: true,
						text: "Centros"
					}

				},
				legendGroup: {
					layout: {
						position: "right"
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				valueAxis: {
					title: {
						visible: false
					}
				}
			});

			// Define Data Set as :
			// + ('period' is Static)
			// + ('qtyxxxx' is Dynamic according Record selected)
			oVizFrameQty.setDataset(new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Período",
					value: "{period}"
				}],

				measures: measureQtyArray,

				data: {
					path: "/ChartContent"
				}
			}));

			// Set DataModel
			oVizFrameQty.setModel(oJsonModel);

			// Measures
			oVizFrameQty.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": "valueAxis",
				"type": "Measure",
				"values": measureAxisArray
			}));

			// Dimensions
			oVizFrameQty.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": "categoryAxis",
				"type": "Dimension",
				"values": ["Período"]
			}));
			oVBox.addItem(oVizFrameQty);

			//------------------------------------------------------------
			// Chart For TIME
			//-----------------------------------------------------------
			// Generate New VizFrame instance (for TIME)
			var oVizFrameTime = new VizFrame({
				"vizType": "combination",
				"width": "100%"
			});

			// Set Properties
			oVizFrameTime.setVizProperties({
				title: {
					text: "Tempo Médio"
				},

				plotArea: {

					// Color Pallet following "Belize (light flavor)" in Sequentuial Pallet
					colorPalette: _colorPallet,

					dataLabel: {
						visible: false
					},
					background: {
						color: "transparent"
					},
					dataShape: {
						primaryAxis: _primaryAxis
					}
				},
				legend: {
					title: {
						visible: true,
						text: "Centros"
					}

				},
				legendGroup: {
					layout: {
						position: "right"
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				valueAxis: {
					title: {
						visible: false
					}
				}
			});

			// Insert New Measure for Limite
			measureTimeArray.push({
				name: "Limit",
				value: "60"
			});
			measureAxisArray.push("Limit");

			// Define Data Set as :
			// + ('period' is Static)
			// + ('qtyxxxx' is Dynamic according Record selected)
			oVizFrameTime.setDataset(new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Período",
					value: "{period}"
				}],

				measures: measureTimeArray,

				data: {
					path: "/ChartContent"
				}
			}));

			// Set DataModel
			oVizFrameTime.setModel(oJsonModel);

			// Measures (Plants)
			oVizFrameTime.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": "valueAxis",
				"type": "Measure",
				"values": measureAxisArray
			}));

			// Dimensions
			oVizFrameTime.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({
				"uid": "categoryAxis",
				"type": "Dimension",
				"values": ["Período"]
			}));
			oVBox.addItem(oVizFrameTime);
		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Fill Dynamic Content for Chart
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		_fillDynamicContentForChart: function (oTable, oJsonModel) {

			// Array Temporário
			var oTempArray = [];

			// Get Selected Lines
			var _selectedLines = oTable.getSelectedIndices();

			// All Periods on Grid
			var _byPerid = oJsonModel.getProperty("/BackEndTableDataByPeriod");
			var dynColumnsQty = oJsonModel.getProperty("/DynCollumnsQty");
			var dynColumnsTime = oJsonModel.getProperty("/DynCollumnsTime");

			// Run All PERIOD
			for (var i = 0; i < _byPerid.length; i++) {

				var tempElement = {};
				tempElement["period"] = _byPerid[i];

				// Run All Selected Lines
				for (var j = 0; j < _selectedLines.length; j++) {

					var selectedLine = oJsonModel.getProperty(
						oTable.getContextByIndex(_selectedLines[j]).sPath);

					// For QUANTITY (Field name will be 'qtyxxxx' )
					for (var k = 0; k < dynColumnsQty.length; k++) {

						if (!dynColumnsQty[k].includes(_byPerid[i]))
							continue;

						tempElement["qty" + selectedLine["plant"]] = selectedLine[dynColumnsQty[k]];
					}

					// For TIME (Field name will be 'timexxxx' )
					for (k = 0; k < dynColumnsTime.length; k++) {

						if (!dynColumnsTime[k].includes(_byPerid[i]))
							continue;

						tempElement["time" + selectedLine["plant"]] = selectedLine[dynColumnsTime[k]];
					}

				}

				// Insert Record
				oTempArray.push(tempElement);

			}
			oTempArray.sort();

			// Replace Content
			oJsonModel.setProperty("/ChartContent", oTempArray);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Customer Event for Table :: On rowSelectionChange Event
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_onRowSelectionChange: function (oControlEvent) {

			// Json Model
			var oJsonModel = this.getView().getModel("displayData");

			// Get Table
			var _oTable = oControlEvent.getSource();

			// Fill Dynamic Content
			this._fillDynamicContentForChart(_oTable, oJsonModel);

			// Generate Dynamic Chart on VBOX
			this._dynamicViewChart(_oTable, oJsonModel);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Fill Collumns for Excel Export
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_columnConfigForDonwload: function (oJsonModel) {
			var array = [];

			// Plants
			var element = {};
			element.label = "Centro";
			element.property = "plant";
			element.type = "String";
			element.width = 6;
			array.push(element);

			// Category
			element = {};
			element.label = "Categoria";
			element.property = "categ";
			element.type = "String";
			element.width = 2;
			array.push(element);

			// Name
			element = {};
			element.label = "Nome";
			element.property = "name";
			element.type = "String";
			element.width = 20;
			array.push(element);

			// Region
			element = {};
			element.label = "Região";
			element.property = "region";
			element.type = "String";
			element.width = 4;
			array.push(element);

			// Dynamic Collumns
			var aDynCols = oJsonModel.getProperty("/DynCollumns");
			for (var i = 0; i < aDynCols.length; i++) {
				element = {};
				element.label = aDynCols[i];
				element.property = aDynCols[i];
				element.type = "Number";
				element.width = 10;
				array.push(element);
			}

			return array;
		},

		/*----------------------------------------------------
		Function: _onPressResetSelection
		Target: Download Content as Excel 
		----------------------------------------------------*/
		_onPressResetSelection: function (oControlEvent) {

			// Get Table
			var _oTable = oControlEvent.getSource().getParent();
			_oTable.clearSelection();

		},

		/*----------------------------------------------------
		Function: _onPressDownload
		Target: Download Content as Excel 
		----------------------------------------------------*/
		_onPressDownload: function (oControlEvent) {

			// Get Json Model
			var oJsonModel = this.getView().getModel("displayData");

			// Define Collumns to Spreadsheet
			var aCols = this._columnConfigForDonwload(oJsonModel);
			var aPlants = oJsonModel.getProperty("/TableContent");

			// Define Settings
			var oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aPlants
			};

			var oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then()
				.catch(function (sMessage) {
					MessageToast.show("Export Error: " + sMessage);
				})
				.finally(oSheet.destroy);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Standard Event :: onInit
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		onInit: function () {

			// Generate new JSON Model for DisplayData
			var oJsonModel = new JSONModel();
			this.getView().setModel(oJsonModel, "displayData");

			// Default Model (OData Model)
			var oDataModel = this.getView().getModel("hanaData");

			// Get Data from BackEnd
			this._get_backend_data(oJsonModel, oDataModel);

		}
	});
});