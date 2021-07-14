const handleProfileImage = (req,res,db) => {
	const {email,imageUrl} = req.body;

	function getUrl1 (email) {
		return db.select("*").from('profile').where({email:email}).then(resp=>resp);
	}

	let urlLink = ""; 
	async function getValue(email) {
		urlLink = await getUrl1(email);
		if(urlLink.length===1) {
			db("profile").returning("*")
			.where({email:email})
			.update({url:imageUrl}).then(data=> {
				res.status(200).json(data[0].url);
			});
		}	
		else if(urlLink.length===0) {
			db("profile").insert({email:email,url:imageUrl})
			.returning("*")
			.then(user=>{
				res.status(200).json(user[0].url);
			});
		}
	}

	getValue(email);
}

module.exports = {
	handleProfileImage:handleProfileImage
}