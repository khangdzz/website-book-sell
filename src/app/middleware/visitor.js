module.exports = function ( req, res, next){
	if(req.session.page_views){
	
		try{
			req.session.page_views++;
			res.locals.viewed = req.session.page_views;
		}
		catch(err){
			next();
		}
	 } else {
		req.session.page_views = 1;
	
	 }
	// console.log(req.session.page_views);
	next();
}