# customDatatablePagination

  The motive is to give rough idea about how you can create/plugged in your datatable pagination pluign in your application and   registered inside datatable initialize configuration using 'paginType' attribute.
  
  
  
  Datatable has 5 types of in-built pagination. To use a particular pagination type, datatable provides one attribute 'paginateType' where developer has to specific registered pagination type.
  
    1. numbers
    2. simple
    3. simple_numbers
    4. full
    5. full_numbers
  
  So as to customize pagination, it is required to create and registered our own pagination type based on requirement which has been written in datatable.pagination.plugin.js file and plugged in as a pagination plugin.
  The registered pagingType here in plugin is 'custome_pagination'.
  
  File pagination.events.js is being used to handle DOM events used in pagination like jump to user entered page, diplay no records based on dropdown selection, etc.
  To register all the events at time of table load, one has to call public method 'listenToEvents()'
  
  File datatable.initialize.js, it's initializer for datatable. To configure/initialize call 'buildDataTable(yourTableID, options)' from your file. It has below configuration to render customize pagination.
  
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
  
  
  
  File pagination.css, look and feel based on UX design.
  
  
