const mongoose = require('mongoose')
const slugify = require('slugify')

const noteSchema = new mongoose.Schema({
	title: {
		type:String,
		required: true
	},
	description: {
		type: String
	},
	content: {
		type: String,
		required:true
	},
	produced: {
		type:Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: true,
		unique: true
	}
})

noteSchema.pre('validate', function(next) {
	if(this.title){
		this.slug = slugify(this.title, { lower : true, strict : true })
	}

	next()
})

module.exports = mongoose.model('Note', noteSchema)