/*
 * File:        pagination.events.js
 * Author:      sjshank
 * Dependencies : requirejs, jquery, jquery datatable, datatable.pagination.plugin
 * Description : Pagination custom events handler.
 * 
 */

define([
        'jquery'
], function(
    	$
	){
	return {
    	changeCount: function(num, numOfRecords){
    		count=Math.floor(num/numOfRecords);				
    		if( num % numOfRecords != 0){
    			count++;
    		}						
    		$('.pagination-control').each(function(e){
    			$(this).find(".current-page-number").val(1);
    			$(this).find(".total-number").text(count);
    			$(this).find(".number-of-records").val(numOfRecords);
    		});		
    		$('.results-group li').each(function(index){
    				if(index>numOfRecords-1)
    				{
    					$(this).hide();
    				}
    		});	
    		this.changeImages();
    	},
    	// to change the images to in disable/enable mode for the pagination.		
    	changeImages: function(){
    		var currentPageNumber = $(".pagination-control:eq(0) .current-page-number").val();
    		this.frmHeadFix();
    	},    	    
    	// To move to the top of results as the user clicks the next page or previous page etc.. 
    	animateResults: function (){
    		$('html, body').animate({
    			scrollTop: $("#wrapper").position().top
    			}, 1000);
    	},    	
    	// To Remove the duplicate headers in the search results
    	frmHeadFix:  function (){    		
    	    $(".results-group-header").hide();
    	    $(".results-group").show();
    	    $('.results-group li').each(function(index){
    	        if ($(this).is(":visible")) {
    	            $(this).parent().prev().show(); // displaying the header of the visible li part
    	            $(this).parent().parent().show();
    	        }
    	    });	    
    	    $(".results-group").each(function(index){
    	        if ($(this).find('ul li:visible').length == 0) {
    	            $(this).hide();
    	        } else {
    	            $(this).show();
    	        }
    	    }); 
    	},    	
    	listenToEvents: function() {
    		var self = this;    			
        	// on click of the First image button			
        	$(".pagination-control-top .first , .pagination-control-bottom .first").on('click',function(e){	
        		e.preventDefault();
        		var currentIndex1= $(".pagination-control:eq(0) .current-page-number").val();
        		var numOfResults1=$('.pagination-control:eq(0) .number-of-records').val();
        		var divsTo = currentIndex1 * numOfResults1;					
        		var divsFrom = divsTo - numOfResults1;        		
        		for(var i = divsFrom ; i < divsTo ; i++){
        			$('.results-group li').eq(i).hide();
        		}        		
        		for(var i=0; i < numOfResults1; i++){
        			$('.results-group li').eq(i).show();
        		}				        
        		$(".pagination-control-top .current-page-number").val(1);
        		$(".pagination-control-bottom .current-page-number").val(1);
        		currentIndex=1;
        		if( $(this).parents('.pagination-control').parent().attr('class') == "pagination-control-bottom"){
        			self.animateResults();
        		}
        		self.changeImages();
        	});	
        	//on click of the Last image button	
        	$(".pagination-control-top .last , .pagination-control-bottom .last").on('click',function(e){
        		e.preventDefault();
        		var currentIndex1= $(".pagination-control:eq(0) .current-page-number").val();
        		var numOfResults1=$('.pagination-control:eq(0) .number-of-records').val();
        		var divsTo = currentIndex1 * numOfResults1;					
        		var divsFrom = divsTo - numOfResults1;        		
        		for(var i = divsFrom ; i < divsTo ; i++){
        			$('.results-group li').eq(i).hide();
        		}        							
        		var divsFrom1 = (count-1) * numOfResults1;        		
        		for(var i=divsFrom1; i < num; i++){
        			$('.results-group li').eq(i).show();
        		}					        		
        		$(".pagination-control-top .current-page-number").val(count);
        		$(".pagination-control-bottom .current-page-number").val(count);
        		currentIndex=count;		
        		if( $(this).parents('.pagination-control').parent().attr('class') == "pagination-control-bottom"){
        			self.animateResults();
        		}
        		self.changeImages();		
        	});
        	//on click of the previous image button	
        	$(".pagination-control-top .prev , .pagination-control-bottom .prev").on('click',function(e){
        		e.preventDefault();
        		var currentIndex1 = $(".pagination-control:eq(0) .current-page-number").val();
        		var numOfResults1 = $('.pagination-control:eq(0) .number-of-records').val();
        		var divsTo = currentIndex1 * numOfResults1;					
        		var divsFrom = divsTo - numOfResults1;        		
        		if(currentIndex1 > 1 && currentIndex1 <= count){	
        			for(var i = divsFrom ; i < divsTo ; i++){
        				$('.results-group li').eq(i).hide();
        			}					
        			var divsTo1 = divsFrom;
        			var divsFrom1 = divsTo1 - numOfResults1;
        			for(var i = divsFrom1 ; i < divsTo1 ; i++){
        				$('.results-group li').eq(i).show();
        			}
        			$(".pagination-control-top .current-page-number").val(currentIndex1-1);
        			$(".pagination-control-bottom .current-page-number").val(currentIndex1-1);
        			currentIndex=currentIndex1-1;
        			if( $(this).parents('.pagination-control').parent().attr('class') == "pagination-control-bottom"){
        				self.animateResults();
        			}
        			self.changeImages();
        		}		
        	});
        	//on click of the Next image button
        	$(".pagination-control-top .next , .pagination-control-bottom .next").on('click', function(e){	
        		e.preventDefault();
        		var currentIndex1 = $(".pagination-control:eq(0) .current-page-number").val();
        		var numOfResults1 = $(".pagination-control:eq(0) .number-of-records").val();
        		var divsTo = currentIndex1 * numOfResults1;					
        		var divsFrom = divsTo - numOfResults1;        		
        		if(currentIndex1 >= 1 && currentIndex1 < count){	
        			for(var i = divsFrom ; i < divsTo ; i++){
        				$('.results-group li').eq(i).hide();
        			}					
        			var divsFrom1 = divsTo;
        			var divsTo1 = parseInt(divsFrom1) + parseInt(numOfResults1);
        			for(var i = divsFrom1 ; i < divsTo1 ; i++){
        				$('.results-group li').eq(i).show();
        			}
        			currentIndex1++;
        			$(".pagination-control-top .current-page-number").val(currentIndex1);
        			$(".pagination-control-bottom .current-page-number").val(currentIndex1);
        			currentIndex=currentIndex1;
        			if( $(this).parents('.pagination-control').parent().attr('class') == "pagination-control-bottom"){
        				self.animateResults();
        			}
        			self.changeImages();
        		}			
        	});
        	//on click of the Last image button
        	$(".pagination-control-top .current-page-number , .pagination-control-bottom .current-page-number").on('keyup',function(e){
        		e.preventDefault();
        		if(e.keyCode==13 || e.keyCode==108){
        			var currentIndex1=$(this).val();
        			var numOfResults1=$('.pagination-control:eq(0) .number-of-records').val();        							
        			if(currentIndex1>0 && currentIndex1<=count){	
        				var divsTo = currentIndex * numOfResults1;					
        				var divsFrom = divsTo - numOfResults1;
        				for(var i = divsFrom ; i < divsTo ; i++){
        					$('.results-group li').eq(i).hide();
        				}	        				
        				var divsTo1 = currentIndex1 * numOfResults1;					
        				var divsFrom1 = divsTo1 - numOfResults1;
        				for(var i = divsFrom1 ; i < divsTo1 ; i++){
        					$('.results-group li').eq(i).show();
        				}
        				$(".pagination-control-top .current-page-number").val(currentIndex1);
        				$(".pagination-control-bottom .current-page-number").val(currentIndex1);
        				currentIndex=currentIndex1;
        				if( $(this).parents('.pagination-control').parent().attr('class') == "pagination-control-bottom"){
        					self.animateResults();
        				}
        				self.changeImages();
        			}			
        			else{
        				$(".pagination-control-top .current-page-number").val(currentIndex);
        				$(".pagination-control-bottom .current-page-number").val(currentIndex);
        			}
        		}
        	});
        	// for no of records changed at the bottom / top
        	$(".pagination-control-top .number-of-records , .pagination-control-bottom .number-of-records").on('change',function(e){
        		e.preventDefault();
        		var currentIndex1=$('.pagination-control:eq(0) .current-page-number').val();
        		var numOfResults1=$(this).val();
        		var divsTo = currentIndex1 * numOfRecords;					
        		var divsFrom = divsTo - numOfRecords;        		
        		for(var i = divsFrom ; i < divsTo ; i++){
        			$('.results-group li').eq(i).hide();
        		}	
        		for(var i=0; i < numOfResults1; i++){
        			$('.results-group li').eq(i).show();
        		}				
        		currentIndex = 1;
        		numOfRecords = numOfResults1;
        		if( $(this).parents('.pagination-control').parent().attr('class') == "pagination-control-bottom"){
        			self.animateResults();
        		}
        		self.changeCount(num, numOfRecords);
        	});	
    	}    	
	};	
});
	
