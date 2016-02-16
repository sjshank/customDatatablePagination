require.config({
	baseUrl : "js/",
	paths : {
		jquery: "lib/jquery.min",
		datatable : "lib/jquery.dataTables.min"
	},
	shim : {
			"datatable" : {
				deps: ["jquery"]
			}
		}
	
});