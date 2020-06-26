function initModel() {
	var sUrl = "/SCP_HANA/LMB_CONSUME/oData/NoteEmissionTime.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}