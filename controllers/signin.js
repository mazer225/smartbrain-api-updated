const handleSignin = (req,res,db,bcrypt) => {

	function getUrl1 (email) {
		return db.select("*").from('profile').where({email:email}).then(resp=>resp);
	}

	let urlLink = ""; 
	async function getValue(email) {
		urlLink = await getUrl1(email);
		return urlLink;
	}

	getValue(req.body.email);
	
	db.select('*').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		const crctPassword = bcrypt.compareSync(req.body.password,data[0].hash);
		if(crctPassword){
			return db.select('*').from('users')
						.where('email','=',req.body.email)
						.then(user=>{
							if(urlLink.length===0) {
								user[0]['url']="";
							}
							else if(urlLink.length===1) {
								user[0]['url']=urlLink[0].url;	
							}
							res.json(user[0]);
						}).catch(err=>res.status(400).json("login error"));
		}	
		else {
			res.status(400).json('Wrong Crendentials');
		}
	}).catch(err=>res.status(400).json("Wrong Crendentials"));
}

module.exports = {
	handleSignin: handleSignin
};