# Datatable Pagination Plugin

  The motive is to give rough idea about how you can create/plugged in your datatable pagination pluign in your application and   registered inside datatable initialize configuration using 'paginType' attribute.
  
  
  
  Datatable has 5 types of in-built pagination. To use a each pagination type, datatable provides one attribute 'paginateType' where one has to specify pagination type.
  
    1. numbers
    2. simple
    3. simple_numbers
    4. full
    5. full_numbers
  
  what if one get a requirment to customize datatable pagination w.r.t look and feel and user experience. In that case, it's required to create our own pagination type based on requirement and plugged in as a pagination plugin.
  In this example, I have written custome pagination code in a separate file datatable.pagination.plugin.js and plugging it as 'custome_pagination' pagingType while rendering HTML Table with data.
 
  
  File pagination.events.js is being used to handle DOM events used in pagination like jump to page, diplay no records based on dropdown selection, etc.
  Bind all the events at time of HTML table load by calling public method 'listenToEvents()'
  
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
  
  
