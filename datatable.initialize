define([ 'jquery', 'datatable' ], function($, datatable) {
	var dataTableOLanguage = {
		"sEmptyTable" : "No results were found based on your search criteria.",
		"oPaginate" : {
			"sFirst" : "&lt;&lt;first",
			"sPrevious" : "&lt;prev",
			"sNext" : "next&gt;",
			"sLast" : "last&gt;&gt;",
			"iFullNumbersShowPages" : 1
		},
		"sLengthMenu" : 'Records per page <select class="pager-pg-list">'
				+ '<option value="10">10</option>'
				+ '<option value="25">25</option>'
				+ '<option value="50">50</option>'
				+ '<option value="100">100</option>' + '</select>'
	};

	
	var dataTableInit = {
		"sDom" : 'rlptlp',
		"iDisplayLength" : 50,
		"bLengthChange" : true,
		"bInfo" : false,
		"bAutoWidth" : false,
		"sPaginationType" : "custome_pagination",
		"oLanguage" : dataTableOLanguage,
	};
	
	//This will gets called when datatable needs to initialize with actual data and options
	return {
		buildDataTable : function(tableId, options) {
			return $(tableId).dataTable($.extend(dataTableInit, options));
		}
	};
});
