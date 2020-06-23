/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"LMBR_CUSTOMER_APP/note_emission_time/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});