const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '5166a668c60e46c9a5a28a4d1f85650c'
});

const handleApiCall = (req,res)=> {
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=> res.status(400).jsn('unable to work with API'));
}

	
const handleImageEntries = (req,res,db) => {
	console.log(req.body);
	db('users')
	.where('id','=',req.body.id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('unvale to get entries'));
}

module.exports = {
	handleImageEntries: handleImageEntries,
	handleApiCall: handleApiCall
};