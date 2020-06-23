sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/Table",
	"sap/viz/ui5/controls/VizFrame",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Table, VizFrame, Spreadsheet, MessageToast) {
	"use strict";

	return Controller.extend("LMBR_CUSTOMER_APP.note_emission_time.controller.V0", {

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Get data from BackEnd Service
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_get_backend_data: function (oJsonModel) {

			// // Default Model (OData Model)
			// var oModel = this.getView().getModel();

			// // Callback para SUCCESS
			// function onSuccess(oData, response) {

			// 	// New Property for TableData
			// 	oJsonModel.setProperty("/TableData/Table", oData.results);

			// 	// Disable Busy Indicator
			// 	oJsonModel.setProperty("/TableData/BusyIndicator", false);

			// 	console.log("Sucesso em pesquisar os dados");
			// }

			// // Callback para ERROR
			// function onError(oError) {

			// 	// Compose Message
			// 	var vMsg = this.getView().getModel("i18n").getProperty("MessageSelectedDataError") + oError.responseText;

			// 	MessageToast.show((vMsg), {
			// 		duration: 500,
			// 		at: "sap.ui.core.Popup.Dock.CenterCenter"
			// 	});
			// 	console.log("Erro na pesquisa dos dados do BackEnd");

			// 	// Disable Busy Indicator
			// 	oJsonModel.setProperty("/TableData/BusyIndicator", false);
			// }

			// // Parameters
			// var oParam = {
			// 	success: onSuccess.bind(this),
			// 	error: onError.bind(this)
			// };

			// // Enable Busy Indicator
			// oJsonModel.setProperty("/TableData/BusyIndicator", false);

			// // Get BlockUsers Content
			// oModel.read("/Products", oParam);

			// BackEnd Table Data
			var _tempData = [{
				plant: "0001",
				categ: "A",
				region: "SP",
				name: "Loja 0001",
				period: "2020_06",
				qty: 30250,
				time: 55
			}, {
				plant: "0002",
				categ: "A",
				region: "SP",
				name: "Loja 0002",
				period: "2020_06",
				qty: 32048,
				time: 60
			}, {
				plant: "0003",
				categ: "B",
				region: "SP",
				name: "CD 0003",
				period: "2020_06",
				qty: 29092,
				time: 90
			}, {
				plant: "0001",
				categ: "A",
				region: "SP",
				name: "Loja 0001",
				period: "2020_05",
				qty: 28209,
				time: 78
			}, {
				plant: "0002",
				categ: "A",
				region: "SP",
				name: "Loja 0002",
				period: "2020_05",
				qty: 23098,
				time: 59
			}, {
				plant: "0003",
				categ: "B",
				region: "SP",
				name: "CD 0003",
				period: "2020_05",
				qty: 10923,
				time: 48
			}, {
				plant: "0001",
				categ: "A",
				region: "SP",
				name: "Loja 0001",
				period: "2020_04",
				qty: 12399,
				time: 44
			}, {
				plant: "0002",
				categ: "A",
				region: "SP",
				name: "Loja 0002",
				period: "2020_04",
				qty: 20932,
				time: 49
			}, {
				plant: "0003",
				categ: "B",
				region: "SP",
				name: "CD 0003",
				period: "2020_04",
				qty: 44209,
				time: 87
			}, {
				plant: "0004",
				categ: "A",
				region: "MG",
				name: "Loja 0004",
				period: "2020_06",
				qty: 30250,
				time: 55
			}, {
				plant: "0005",
				categ: "A",
				region: "MG",
				name: "Loja 0005",
				period: "2020_06",
				qty: 32048,
				time: 60
			}, {
				plant: "0006",
				categ: "B",
				region: "MG",
				name: "CD 0006",
				period: "2020_06",
				qty: 29092,
				time: 90
			}, {
				plant: "0004",
				categ: "A",
				region: "MG",
				name: "Loja 0004",
				period: "2020_05",
				qty: 28209,
				time: 78
			}, {
				plant: "0005",
				categ: "A",
				region: "MG",
				name: "Loja 0005",
				period: "2020_05",
				qty: 23098,
				time: 59
			}, {
				plant: "0006",
				categ: "B",
				region: "MG",
				name: "CD 0006",
				period: "2020_05",
				qty: 10923,
				time: 48
			}, {
				plant: "0004",
				categ: "A",
				region: "MG",
				name: "Loja 0004",
				period: "2020_04",
				qty: 12399,
				time: 44
			}, {
				plant: "0005",
				categ: "A",
				region: "MG",
				name: "Loja 0005",
				period: "2020_04",
				qty: 20932,
				time: 49
			}, {
				plant: "0006",
				categ: "B",
				region: "MG",
				name: "CD 0006",
				period: "2020_04",
				qty: 44209,
				time: 87
			}, {
				plant: "0007",
				categ: "A",
				region: "PR",
				name: "Loja 0007",
				period: "2020_06",
				qty: 30250,
				time: 55
			}, {
				plant: "0008",
				categ: "A",
				region: "PR",
				name: "Loja 0008",
				period: "2020_06",
				qty: 32048,
				time: 60
			}, {
				plant: "0009",
				categ: "B",
				region: "PR",
				name: "CD 0009",
				period: "2020_06",
				qty: 29092,
				time: 90
			}, {
				plant: "0007",
				categ: "A",
				region: "PR",
				name: "Loja 0007",
				period: "2020_05",
				qty: 28209,
				time: 78
			}, {
				plant: "0008",
				categ: "A",
				region: "PR",
				name: "Loja 0008",
				period: "2020_05",
				qty: 23098,
				time: 59
			}, {
				plant: "0009",
				categ: "B",
				region: "PR",
				name: "CD 0009",
				period: "2020_05",
				qty: 10923,
				time: 48
			}, {
				plant: "0007",
				categ: "A",
				region: "PR",
				name: "Loja 0007",
				period: "2020_04",
				qty: 12399,
				time: 44
			}, {
				plant: "0008",
				categ: "A",
				region: "PR",
				name: "Loja 0008",
				period: "2020_04",
				qty: 20932,
				time: 49
			}, {
				plant: "0009",
				categ: "B",
				region: "PR",
				name: "CD 0009",
				period: "2020_04",
				qty: 44209,
				time: 87
			}, {
				plant: "0010",
				categ: "A",
				region: "RJ",
				name: "Loja 0010",
				period: "2020_06",
				qty: 30250,
				time: 55
			}, {
				plant: "0011",
				categ: "A",
				region: "RJ",
				name: "Loja 0011",
				period: "2020_06",
				qty: 32048,
				time: 60
			}, {
				plant: "0012",
				categ: "B",
				region: "RJ",
				name: "Loja 0012",
				period: "2020_06",
				qty: 29092,
				time: 90
			}, {
				plant: "0010",
				categ: "A",
				region: "RJ",
				name: "Loja 0010",
				period: "2020_05",
				qty: 28209,
				time: 78
			}, {
				plant: "0011",
				categ: "A",
				region: "RJ",
				name: "Loja 0011",
				period: "2020_05",
				qty: 23098,
				time: 59
			}, {
				plant: "0012",
				categ: "B",
				region: "RJ",
				name: "Loja 0012",
				period: "2020_05",
				qty: 10923,
				time: 48
			}, {
				plant: "0010",
				categ: "A",
				region: "RJ",
				name: "Loja 0010",
				period: "2020_04",
				qty: 12399,
				time: 44
			}, {
				plant: "0011",
				categ: "A",
				region: "RJ",
				name: "Loja 0011",
				period: "2020_04",
				qty: 20932,
				time: 49
			}, {
				plant: "0012",
				categ: "B",
				region: "RJ",
				name: "Loja 0012",
				period: "2020_04",
				qty: 44209,
				time: 87
			}, {
				plant: "0013",
				categ: "A",
				region: "SC",
				name: "Loja 0013",
				period: "2020_06",
				qty: 30250,
				time: 55
			}, {
				plant: "0014",
				categ: "A",
				region: "SC",
				name: "Loja 0014",
				period: "2020_06",
				qty: 32048,
				time: 60
			}, {
				plant: "0015",
				categ: "B",
				region: "SC",
				name: "Loja 0015",
				period: "2020_06",
				qty: 29092,
				time: 90
			}, {
				plant: "0013",
				categ: "A",
				region: "SC",
				name: "Loja 0013",
				period: "2020_05",
				qty: 28209,
				time: 78
			}, {
				plant: "0014",
				categ: "A",
				region: "SC",
				name: "Loja 0014",
				period: "2020_05",
				qty: 23098,
				time: 59
			}, {
				plant: "0015",
				categ: "B",
				region: "SC",
				name: "Loja 0015",
				period: "2020_05",
				qty: 10923,
				time: 48
			}, {
				plant: "0013",
				categ: "A",
				region: "SC",
				name: "Loja 0013",
				period: "2020_04",
				qty: 12399,
				time: 44
			}, {
				plant: "0014",
				categ: "A",
				region: "SC",
				name: "Loja 0014",
				period: "2020_04",
				qty: 20932,
				time: 49
			}, {
				plant: "0015",
				categ: "B",
				region: "SC",
				name: "Loja 0015",
				period: "2020_04",
				qty: 44209,
				time: 87
			}, {
				plant: "0001",
				categ: "A",
				region: "SP",
				name: "Loja 0001",
				period: "2020_03",
				qty: 30250,
				time: 55
			}, {
				plant: "0002",
				categ: "A",
				region: "SP",
				name: "Loja 0002",
				period: "2020_03",
				qty: 32048,
				time: 60
			}, {
				plant: "0003",
				categ: "B",
				region: "SP",
				name: "CD 0003",
				period: "2020_03",
				qty: 29092,
				time: 90
			}, {
				plant: "0001",
				categ: "A",
				region: "SP",
				name: "Loja 0001",
				period: "2020_02",
				qty: 28209,
				time: 78
			}, {
				plant: "0002",
				categ: "A",
				region: "SP",
				name: "Loja 0002",
				period: "2020_02",
				qty: 23098,
				time: 59
			}, {
				plant: "0003",
				categ: "B",
				region: "SP",
				name: "CD 0003",
				period: "2020_02",
				qty: 10923,
				time: 48
			}, {
				plant: "0001",
				categ: "A",
				region: "SP",
				name: "Loja 0001",
				period: "2020_01",
				qty: 12399,
				time: 44
			}, {
				plant: "0002",
				categ: "A",
				region: "SP",
				name: "Loja 0002",
				period: "2020_01",
				qty: 20932,
				time: 49
			}, {
				plant: "0003",
				categ: "B",
				region: "SP",
				name: "CD 0003",
				period: "2020_01",
				qty: 44209,
				time: 87
			}, {
				plant: "0004",
				categ: "A",
				region: "MG",
				name: "Loja 0004",
				period: "2020_03",
				qty: 30250,
				time: 55
			}, {
				plant: "0005",
				categ: "A",
				region: "MG",
				name: "Loja 0005",
				period: "2020_03",
				qty: 32048,
				time: 60
			}, {
				plant: "0006",
				categ: "B",
				region: "MG",
				name: "CD 0006",
				period: "2020_03",
				qty: 29092,
				time: 90
			}, {
				plant: "0004",
				categ: "A",
				region: "MG",
				name: "Loja 0004",
				period: "2020_02",
				qty: 28209,
				time: 78
			}, {
				plant: "0005",
				categ: "A",
				region: "MG",
				name: "Loja 0005",
				period: "2020_02",
				qty: 23098,
				time: 59
			}, {
				plant: "0006",
				categ: "B",
				region: "MG",
				name: "CD 0006",
				period: "2020_02",
				qty: 10923,
				time: 48
			}, {
				plant: "0004",
				categ: "A",
				region: "MG",
				name: "Loja 0004",
				period: "2020_01",
				qty: 12399,
				time: 44
			}, {
				plant: "0005",
				categ: "A",
				region: "MG",
				name: "Loja 0005",
				period: "2020_01",
				qty: 20932,
				time: 49
			}, {
				plant: "0006",
				categ: "B",
				region: "MG",
				name: "CD 0006",
				period: "2020_01",
				qty: 44209,
				time: 87
			}, {
				plant: "0007",
				categ: "A",
				region: "PR",
				name: "Loja 0007",
				period: "2020_03",
				qty: 30250,
				time: 55
			}, {
				plant: "0008",
				categ: "A",
				region: "PR",
				name: "Loja 0008",
				period: "2020_03",
				qty: 32048,
				time: 60
			}, {
				plant: "0009",
				categ: "B",
				region: "PR",
				name: "CD 0009",
				period: "2020_03",
				qty: 29092,
				time: 90
			}, {
				plant: "0007",
				categ: "A",
				region: "PR",
				name: "Loja 0007",
				period: "2020_02",
				qty: 28209,
				time: 78
			}, {
				plant: "0008",
				categ: "A",
				region: "PR",
				name: "Loja 0008",
				period: "2020_02",
				qty: 23098,
				time: 59
			}, {
				plant: "0009",
				categ: "B",
				region: "PR",
				name: "CD 0009",
				period: "2020_02",
				qty: 10923,
				time: 48
			}, {
				plant: "0007",
				categ: "A",
				region: "PR",
				name: "Loja 0007",
				period: "2020_01",
				qty: 12399,
				time: 44
			}, {
				plant: "0008",
				categ: "A",
				region: "PR",
				name: "Loja 0008",
				period: "2020_01",
				qty: 20932,
				time: 49
			}, {
				plant: "0009",
				categ: "B",
				region: "PR",
				name: "CD 0009",
				period: "2020_01",
				qty: 44209,
				time: 87
			}, {
				plant: "0010",
				categ: "A",
				region: "RJ",
				name: "Loja 0010",
				period: "2020_03",
				qty: 30250,
				time: 55
			}, {
				plant: "0011",
				categ: "A",
				region: "RJ",
				name: "Loja 0011",
				period: "2020_03",
				qty: 32048,
				time: 60
			}, {
				plant: "0012",
				categ: "B",
				region: "RJ",
				name: "Loja 0012",
				period: "2020_03",
				qty: 29092,
				time: 90
			}, {
				plant: "0010",
				categ: "A",
				region: "RJ",
				name: "Loja 0010",
				period: "2020_02",
				qty: 28209,
				time: 78
			}, {
				plant: "0011",
				categ: "A",
				region: "RJ",
				name: "Loja 0011",
				period: "2020_02",
				qty: 23098,
				time: 59
			}, {
				plant: "0012",
				categ: "B",
				region: "RJ",
				name: "Loja 0012",
				period: "2020_02",
				qty: 10923,
				time: 48
			}, {
				plant: "0010",
				categ: "A",
				region: "RJ",
				name: "Loja 0010",
				period: "2020_01",
				qty: 12399,
				time: 44
			}, {
				plant: "0011",
				categ: "A",
				region: "RJ",
				name: "Loja 0011",
				period: "2020_01",
				qty: 20932,
				time: 49
			}, {
				plant: "0012",
				categ: "B",
				region: "RJ",
				name: "Loja 0012",
				period: "2020_01",
				qty: 44209,
				time: 87
			}, {
				plant: "0013",
				categ: "A",
				region: "SC",
				name: "Loja 0013",
				period: "2020_03",
				qty: 30250,
				time: 55
			}, {
				plant: "0014",
				categ: "A",
				region: "SC",
				name: "Loja 0014",
				period: "2020_03",
				qty: 32048,
				time: 60
			}, {
				plant: "0015",
				categ: "B",
				region: "SC",
				name: "Loja 0015",
				period: "2020_03",
				qty: 29092,
				time: 90
			}, {
				plant: "0013",
				categ: "A",
				region: "SC",
				name: "Loja 0013",
				period: "2020_02",
				qty: 28209,
				time: 78
			}, {
				plant: "0014",
				categ: "A",
				region: "SC",
				name: "Loja 0014",
				period: "2020_02",
				qty: 23098,
				time: 59
			}, {
				plant: "0015",
				categ: "B",
				region: "SC",
				name: "Loja 0015",
				period: "2020_02",
				qty: 10923,
				time: 48
			}, {
				plant: "0013",
				categ: "A",
				region: "SC",
				name: "Loja 0013",
				period: "2020_01",
				qty: 12399,
				time: 44
			}, {
				plant: "0014",
				categ: "A",
				region: "SC",
				name: "Loja 0014",
				period: "2020_01",
				qty: 20932,
				time: 49
			}, {
				plant: "0015",
				categ: "B",
				region: "SC",
				name: "Loja 0015",
				period: "2020_01",
				qty: 44209,
				time: 87
			}];

			for (var i = 0; i < _tempData.length; i++) {
				_tempData[i].qty = Math.floor(Math.random() * 500) + 500;
				_tempData[i].time = Math.floor(Math.random() * 30) + 30;
			}
			oJsonModel.setProperty("/BackEndTableData", _tempData);

			function removeDuplicates(originalArray, prop) {
				var newArray = [];
				var lookupObject = {};

				for (var i in originalArray) {
					lookupObject[originalArray[i][prop]] = originalArray[i];
				}

				for (i in lookupObject) {
					newArray.push(lookupObject[i]);
				}
				return newArray;
			}

			// Get Unique Occurrence for PLANT field
			var uniqueArrayPlant = removeDuplicates(_tempData, "plant");
			oJsonModel.setProperty("/BackEndTableDataByPlant", uniqueArrayPlant);

			// Get Unique Occurrence for PERIOD field
			var uniqueArrayPeriod = removeDuplicates(_tempData, "period");
			oJsonModel.setProperty("/BackEndTableDataByPeriod", uniqueArrayPeriod);

			// Run for PLANT
			var newArray = [];
			var dynColumns = [];
			var dynColumnsQty = [];
			var dynColumnsTime = [];
			for (var i = 0; i < uniqueArrayPlant.length; i++) {

				// New Element for Array
				var newElement = {};
				newElement['plant'] = uniqueArrayPlant[i].plant;
				newElement['categ'] = uniqueArrayPlant[i].categ;
				newElement['region'] = uniqueArrayPlant[i].region;
				newElement['name'] = uniqueArrayPlant[i].name;

				// Run for PERIOD
				for (var j = 0; j < uniqueArrayPeriod.length; j++) {

					// Search Record on Array
					var result = {};
					for (var k = 0; k < _tempData.length; k++) {
						if (_tempData[k].plant === uniqueArrayPlant[i].plant &&
							_tempData[k].period === uniqueArrayPeriod[j].period) {
							result = _tempData[k];
							break;
						}
					}

					// Fill Dynamic for QUANTITY
					var dynQty = 0;
					if (result.hasOwnProperty("qty"))
						dynQty = result.qty;
					var fieldForQty = uniqueArrayPeriod[j].period + "_qty";
					newElement[fieldForQty] = dynQty;

					// Fill Dynamic for TIME
					var dynTime = 0;
					if (result.hasOwnProperty("time"))
						dynTime = result.time;
					var fieldForTime = uniqueArrayPeriod[j].period + "_time";
					newElement[fieldForTime] = dynTime;

					// Insert Dynamic Collumns (QTY)
					var newCollumnQty = {};
					newCollumnQty.name = fieldForQty;
					dynColumns.push(newCollumnQty);
					dynColumnsQty.push(newCollumnQty);

					// Insert Dynamic Collumns (TIME)
					var newCollumnTime = {};
					newCollumnTime.name = fieldForTime;
					dynColumns.push(newCollumnTime);
					dynColumnsTime.push(newCollumnTime);
				}

				// Fill new Record
				newArray.push(newElement);
			}

			// Set Dynamic collumns (ALL)
			dynColumns = removeDuplicates(dynColumns, "name");
			oJsonModel.setProperty("/DynCollumns", dynColumns);

			// Set Dynamic collumns (QTY)
			dynColumnsQty = removeDuplicates(dynColumnsQty, "name");
			oJsonModel.setProperty("/DynCollumnsQty", dynColumnsQty);

			// Set Dynamic collumns (TIME)
			dynColumnsTime = removeDuplicates(dynColumnsTime, "name");
			oJsonModel.setProperty("/DynCollumnsTime", dynColumnsTime);

			// Set Table Content for Grid Table Display
			oJsonModel.setProperty("/TableContent", newArray);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Generate Dinamic Table for Xml View
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		_dynamicViewTable: function (oJsonModel) {

			// Reference of Controller
			var _self = this;

			// Generate New Table
			var oTable = new Table("GridTable", {
				selectionMode: "MultiToggle",
				visibleRowCount: oJsonModel.getProperty("/TableContent").length, // Quantity of Lines Already to avoid ScroolBar
				enableSelectAll: true,
				alternateRowColors: true
			});

			// Column for "PLANTS"
			var oTextPlant = new sap.m.Text({
				text: "{displayData>plant}",
				wrapping: false
			});
			var oCol1 = new sap.ui.table.Column().setTemplate(oTextPlant);
			oCol1.setAutoResizable(true);
			oCol1.setWidth("5rem");
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
			oCol2.setWidth("5rem");
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
			oCol3.setWidth("5rem");
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
			oCol4.setWidth("7rem");
			oCol4.setSortProperty("region");
			oCol4.setFilterProperty("region");
			oCol4.setShowFilterMenuEntry(true);
			oCol4.setShowSortMenuEntry(true);
			oCol4.setLabel(new sap.m.Label({
				text: "Region"
			}));
			oTable.addColumn(oCol4);

			// var dynCollumns = oJsonModel.getProperty("/DynCollumns");
			// for (var i = 0; i < dynCollumns.length; i++) {

			// 	// Column for "DynCollumns"
			// 	var textProp = "{displayData>" + dynCollumns[i].name + "}";
			// 	var oTextDyn = new sap.m.Text({
			// 		text: textProp
			// 	});
			// 	var oColDyn = new sap.ui.table.Column().setTemplate(oTextDyn);
			// 	oColDyn.setAutoResizable(true);
			// 	oColDyn.setWidth("7rem");
			// 	oColDyn.setSortProperty(dynCollumns[i].name);
			// 	oColDyn.setFilterProperty(dynCollumns[i].name);
			// 	oColDyn.setShowFilterMenuEntry(true);
			// 	oColDyn.setShowSortMenuEntry(true);
			// 	oColDyn.setLabel(new sap.m.Label({
			// 		text: dynCollumns[i].name
			// 	}));
			// 	oTable.addColumn(oColDyn);
			// }

			// Save Controller for internal reference
			oTable.attachRowSelectionChange(function (oEvent) {
				_self.onRowSelectionChange(oEvent);
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
		// Standard Event :: onInit
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		onInit: function () {

			// Generate new JSON Model for DisplayData
			var oJsonModel = new JSONModel();
			this.getView().setModel(oJsonModel, "displayData");

			// Get Data from BackEnd
			this._get_backend_data(oJsonModel);

			// Generate Dynamic Table on VBOX
			this._dynamicViewTable(oJsonModel);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Fill Dynamic Content
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		
		_fillDynamicContent: function (oTable, oJsonModel) {

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
				tempElement["period"] = _byPerid[i].period;

				// Run All Selected Lines
				for (var j = 0; j < _selectedLines.length; j++) {

					var selectedLine = oJsonModel.getProperty(
						oTable.getContextByIndex(_selectedLines[j]).sPath);

					// For QUANTITY (Field name will be 'qtyxxxx' )
					for (var k = 0; k < dynColumnsQty.length; k++) {

						if (!dynColumnsQty[k].name.includes(_byPerid[i].period))
							continue;

						tempElement["qty" + selectedLine["plant"]] = selectedLine[dynColumnsQty[k].name];
					}

					// For TIME (Field name will be 'timexxxx' )
					for (k = 0; k < dynColumnsTime.length; k++) {

						if (!dynColumnsTime[k].name.includes(_byPerid[i].period))
							continue;

						tempElement["time" + selectedLine["plant"]] = selectedLine[dynColumnsTime[k].name];
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
		onRowSelectionChange: function (oControlEvent) {

			// Json Model
			var oJsonModel = this.getView().getModel("displayData");

			// Get Table
			var _oTable = oControlEvent.getSource();

			// Fill Dynamic Content
			this._fillDynamicContent(_oTable, oJsonModel);

			// Generate Dynamic Chart on VBOX
			this._dynamicViewChart(_oTable, oJsonModel);

		},

		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Fill Collumns for Excel Export
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		columnConfigForDonwload: function (oJsonModel) {
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
				element.label    = aDynCols[i].name;
				element.property = aDynCols[i].name;
				element.type     = "Number";
				element.width    = 10;
				array.push(element);
			}

			return array;
		},

		/*----------------------------------------------------
		Function: onPressDownload
		Target: Download Content as Excel 
		----------------------------------------------------*/
		onPressDownload: function (oControlEvent) {

			var oJsonModel = this.getView().getModel("displayData");

			var aCols = this.columnConfigForDonwload(oJsonModel);
			var aPlants = oJsonModel.getProperty("/TableContent");

			var oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aPlants
			};

			var oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function () {
					MessageToast.show("Download Concluído com sucesso");
				})
				.finally(oSheet.destroy);

		}
	});
});