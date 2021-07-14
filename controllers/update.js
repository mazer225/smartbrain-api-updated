const handleUpdate = (req,res,db) => {
	const {id,name,email,oldEmail} = req.body;
	db("login").where("email","=",oldEmail).update({email:email}).then(resp=>resp);
	db("users").returning("*").where("id","=",id).update({
		name:name,
		email:email
	}).then(result=>res.json(result[0]));

}

module.exports = {
	handleUpdate:handleUpdate
}