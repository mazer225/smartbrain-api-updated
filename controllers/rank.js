const handleRank = (req,res,db) => {
	const {name} = req.body;

	const subqueryEntries = db('users').where('name','=',name).select('entries'); 

	//Select entries from users where name={given_name}
	const subqueryId = db('users').where('name','=',name).select('id');	
	const firstPartOfQuery = db('users')
							.where('entries','>',subqueryEntries)
							.select("id"); 

	//Select * from users where entries > (Select entries from users where name={given_name})

	const secondPartOfQuery = db({alias1:db("users").where("entries","=",subqueryEntries)})
							  .where("id","<=",subqueryId)
							  .select("id"); 

	//Select id from (select id from users where entries = (select entries from users where name='mazer')) as foo where id< (select id from users where name='mazer');
	
	db({alias2:firstPartOfQuery.union([secondPartOfQuery])})
	.count('id')
	.then(rank=>res.json(rank[0]));	

}

module.exports = {
	handleRank:handleRank
}