require.config({
	baseUrl : "/",
	paths : {
		jquery: "lib/jquery.min",
		datatable : "lib/jquery.dataTables.min"
	},
	shim : {
			"jquerydatatable" : {
				deps: ["jquery"]
			}
		}
	
});