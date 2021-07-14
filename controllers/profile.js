const handleProfile = (req,res,db,knex) => {
	const {id} = req.params;
	
	db.select("*").from("users").where({id}).then(user=>{
		if(user.length){
			res.json(user[0])	
		} else {
			res.status(404).send("user with the given id not found");	
		}
	});
}

module.exports = {
	handleProfile: handleProfile
};