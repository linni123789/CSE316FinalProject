const { model, Schema, ObjectId } = require('mongoose'); 

const RegionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		capital:{
			type: String,
			required: true
		},
		leader:{
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		parentRegion: {
			type: String,
			required: true
		},
		landmarks: [String],
		subregions: [String],

	},
	{ timestamps: true }
);

const Region = model('Region', RegionSchema);
module.exports = Region;