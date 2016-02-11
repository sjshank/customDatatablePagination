/*
 * File:        datatable.pagination.plugin.js
 * Author:      sjshank
 * Dependencies : requirejs, jquery, jquery datatable
 * 
 */

define(
		[ 'jquery' ],
		function($) {

			$.fn.dataTableExt.oApi.fnFeatureHtmlPaginate = function(oSettings) {
				return {
					"iStart" : oSettings._iDisplayStart,
					"iEnd" : oSettings.fnDisplayEnd(),
					"iLength" : oSettings._iDisplayLength,
					"iTotal" : oSettings.fnRecordsTotal(),
					"iFilteredTotal" : oSettings.fnRecordsDisplay(),
					"iPage" : oSettings._iDisplayLength === -1 ? 0 : Math
							.ceil(oSettings._iDisplayStart
									/ oSettings._iDisplayLength),
					"iTotalPages" : oSettings._iDisplayLength === -1 ? 0 : Math
							.ceil(oSettings.fnRecordsDisplay()
									/ oSettings._iDisplayLength)
				};
			};

			/*
			 *  custome full numbers pagination 
			 */
			$.extend(
							$.fn.dataTableExt.oPagination,
							{
								"custome_pagination" : {

									'_gotoPg' : function(oSettings, page,
											fnCallbackDraw, event) {
										if (oSettings.oApi._fnPageChange(
												oSettings, page)) {
											fnCallbackDraw(oSettings);
										}
										if (event) {
											event.preventDefault();
										}
									},

									
									"fnInit" : function(oSettings, nPaging,
											fnCallbackDraw) {
										var _self = this;
										var oLang = oSettings.oLanguage.oPaginate;
										var oClasses = oSettings.oClasses;
										var fnClickHandler = function(e) {
											_self._gotoPg(oSettings,
													e.data.action,
													fnCallbackDraw, e);
										};
										var imagesUrl = $.fn.dataTableExt.oPagination.custome_full_numbers_imageUrl;
										this.initPager(oSettings);
										var pgBtnLink = ' tabindex="'
												+ oSettings.iTabIndex + '" ';
										var pgBtnClass = ' class="'
												+ oClasses.sPageButton + ' ';
										$(nPaging)
												.append(

														'<ul class="pager-list">'
																+ '<li>'
																+ '<div class="pager-list-btn-container"><ul class="pager-list">'
																+ '<li><a href="#" '
																+ pgBtnLink
																+ ' '
																+ pgBtnClass
																+ ' '
																+ oClasses.sPageFirst
																+ '"><span class="btn-img">&nbsp;</span></a></li>'
																+ '<li><a href="#" '
																+ pgBtnLink
																+ ' '
																+ pgBtnClass
																+ ' '
																+ oClasses.sPagePrevious
																+ '"><span class="btn-img">&nbsp;</span></a></li>'
																+ '</ul></div>'
																+ '</li>'
																+ '<li class="pager-list-input">Page <input type="text" value="1" size="1" /> of 1 </li>'
																+ '<li>'
																+ '<div class="pager-list-btn-container"><ul class="pager-list">'
																+ '<li><a href="#" '
																+ pgBtnLink
																+ ' '
																+ pgBtnClass
																+ ' '
																+ oClasses.sPageNext
																+ '"><span class="btn-img">&nbsp;</span></a></li>'
																+ '<li><a href="#" '
																+ pgBtnLink
																+ ' '
																+ pgBtnClass
																+ ' '
																+ oClasses.sPageLast
																+ '"><span class="btn-img">&nbsp;</span></a></li>'
																+ '</ul></div>'
																+ '</li>'
																+ '<ul>');
										var els = $('a', nPaging);
										var nFirst = els[0], nPrev = els[1], nNext = els[2], nLast = els[3];

										oSettings.oApi._fnBindAction(nFirst, {
											action : "first"
										}, fnClickHandler);
										oSettings.oApi._fnBindAction(nPrev, {
											action : "previous"
										}, fnClickHandler);
										oSettings.oApi._fnBindAction(nNext, {
											action : "next"
										}, fnClickHandler);
										oSettings.oApi._fnBindAction(nLast, {
											action : "last"
										}, fnClickHandler);


										if (!oSettings.aanFeatures.p) {
											nPaging.id = oSettings.sTableId
													+ '_paginate';
											nFirst.id = oSettings.sTableId
													+ '_first';
											nPrev.id = oSettings.sTableId
													+ '_previous';
											nNext.id = oSettings.sTableId
													+ '_next';
											nLast.id = oSettings.sTableId
													+ '_last';
										}
									},

									"initPager" : function(oSettings) {
										var oLang = oSettings.oLanguage.oPaginate;
										oLang.sFirst = ' ';
										oLang.sPrevious = '';
										oLang.sNext = '';
										oLang.sLast = '';
									},

									/*
									 * Update the list of page buttons
									 */
									"fnUpdate" : function(oSettings,
											fnCallbackDraw) {
										if (!oSettings.aanFeatures.p) {
											return;
										}

										var iPageCount = $.fn.dataTableExt.oPagination.iFullNumbersShowPages;
										var iPageCountHalf = Math
												.floor(iPageCount / 2);
										var iPages = Math.ceil((oSettings
												.fnRecordsDisplay())
												/ oSettings._iDisplayLength);
										var iCurrentPage = Math
												.ceil(oSettings._iDisplayStart
														/ oSettings._iDisplayLength) + 1;
										var sList = "";
										var iStartButton, iEndButton, i, iLen;
										var oClasses = oSettings.oClasses;
										var anButtons, anStatic, nPaginateList, nNode;
										var an = oSettings.aanFeatures.p;
							
										if (oSettings._iDisplayLength === -1) {
											iStartButton = 1;
											iEndButton = 1;
											iCurrentPage = 1;
										} else if (iPages < iPageCount) {
											iStartButton = 1;
											iEndButton = iPages;
										} else if (iCurrentPage <= iPageCountHalf) {
											iStartButton = 1;
											iEndButton = iPageCount;
										} else if (iCurrentPage >= (iPages - iPageCountHalf)) {
											iStartButton = iPages - iPageCount
													+ 1;
											iEndButton = iPages;
										} else {
											iStartButton = iCurrentPage
													- Math.ceil(iPageCount / 2)
													+ 1;
											iEndButton = iStartButton
													+ iPageCount - 1;
										}


										var pgSettings = $.fn.dataTableExt.oApi
												.fnFeatureHtmlPaginate(oSettings);
										var currPg = 0;
										if (pgSettings.iTotalPages > 0) {
											if (pgSettings.iTotalPages > 1) {
												currPg = pgSettings.iPage + 1;
											} else {
												currPg = 1;
											}
										}
										sList += 'Page &nbsp;&nbsp;<input type=text size=1 name="pager_pg" class="lui-input-field pager-pg-input" value="'
												+ (currPg)
												+ '" /> &nbsp;of '
												+ pgSettings.iTotalPages;


										for (i = 0, iLen = an.length; i < iLen; i++) {
											nNode = an[i];
											if (!nNode.hasChildNodes()) {
												continue;
											}
											if (sList != null
													&& sList.length > 0) {
												$(nNode).addClass(
														'pager-list-has-pgs');
											} else {
												$(nNode).removeClass(
														'pager-list-has-pgs');
											}

											var placeHolder = $(
													'.pager-list-input', nNode);
											placeHolder.html(sList);
											var data = $
													.extend(
															this,
															{
																oSettings : oSettings,
																fnCallbackDraw : fnCallbackDraw,
																nNode : nNode
															});
											$(
													'.lui-input-field.pager-pg-input',
													nNode).on('change', data,
													this.changePage);

											this.updateControls(oSettings,
													oClasses, iCurrentPage,
													iPages, nNode);
										}
									},

									changePage : function(event) {
										var pgSettings = $.fn.dataTableExt.oApi
												.fnFeatureHtmlPaginate(event.data.oSettings);
										var currPg = (pgSettings.iPage >= 0) ? pgSettings.iPage + 1
												: pgSettings.iPage;
										var val = parseInt(event.target.value);
										if (val
												&& NaN != val
												&& (val < 0 || pgSettings.iTotalPages < val)) {
											val = NaN;
										}
										if (val && NaN != val) {
											event.data._gotoPg(
													event.data.oSettings,
													(val > 0 ? val - 1 : val),
													event.data.fnCallbackDraw);
											;
										} else {
											$(event.target).val(currPg);
										}
									},

									updateControls : function(oSettings,
											oClasses, iCurrentPage, iPages,
											nNode) {
										anButtons = nNode
												.getElementsByTagName('a');
										anStatic = [
												anButtons[0],
												anButtons[1],
												anButtons[anButtons.length - 2],
												anButtons[anButtons.length - 1] ];
										var is1stPg = (iCurrentPage == 1);
										var haveNoMorePgs = (iPages === 0
												|| iCurrentPage === iPages || oSettings._iDisplayLength === -1);
										$(anStatic)
												.removeClass(
														oClasses.sPageButton
																+ " "
																+ oClasses.sPageButtonActive
																+ " "
																+ oClasses.sPageButtonStaticDisabled);
										$([ anStatic[0], anStatic[1] ])
												.addClass(
														is1stPg ? oClasses.sPageButtonStaticDisabled
																: oClasses.sPageButton);
										$([ anStatic[2], anStatic[3] ])
												.addClass(
														haveNoMorePgs ? oClasses.sPageButtonStaticDisabled
																: oClasses.sPageButton);
									}
								}
							});

		});
