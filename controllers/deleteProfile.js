const handleDelete = (req,res,db) => {
	const {id,name,email} = req.body;

	db("users").where("email","=",email).del()
		.then(resp=>resp)
		.catch(err=>res.json("Error While Removing User"));
	db("login").where("email","=",email).del()
		.then(resp=>res.json("Successfully Removed User"))
		.catch(err=>res.json("Error While Removing User"));

}

module.exports = {
	handleDelete:handleDelete
}