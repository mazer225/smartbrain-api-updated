const handleRegister = async (req,res,db,bcrypt,registerValidation) => {
	const {name,email,password} = req.body;
	if(!email || !name || !password){
		return res.status(404).json("Incorrect Form Submission");
	}

	const {error} = registerValidation(req.body);
	if(error) {
		return res.status(400).json(error.details[0].message);
	}

	const userNameExists = await db("users").where({name}).returning("name").then(resp=>resp);
	if(userNameExists[0]) {
		return res.status(400).json("Username already taken");
	}

	const emailExists = await db("users").where({email}).returning("email").then(resp=>resp);
	if(emailExists[0]) {
		return res.status(400).json("Email already exists");
	}

	const hash = bcrypt.hashSync(password);

	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		}).into('login')
		.returning('email')
		.then(loginEmail=>{
			trx('users')
			.returning('*')
			.insert({
				email:loginEmail[0],
				name:name,
				joined:new Date()
			}).then(user=>{
				res.json(user[0]);
			})
		}).then(trx.commit)
		.catch(trx.rollback)
	}).catch(err=>res.status(400).json("unable to register"));
	
	
}

module.exports = {
	handleRegister: handleRegister
};