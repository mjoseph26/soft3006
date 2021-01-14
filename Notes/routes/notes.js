const express = require('express')
const Note = require('./../models/note')
const router = express.Router()

router.get('/new',function(req,res){
	res.render('notes/new', {note : new Note() })
})

router.get('/edit/:id',async function(req,res){
	const note = await Note.findById(req.params.id)
	res.render('notes/edit', {note : note })
})

router.get('/:slug', async function(req,res){
	const note = await Note.findOne({ slug: req.params.slug })
	if(note == null) res.redirect('/')
	res.render('notes/show', { note : note })
})

router.post('/',async function(req,res, next){
	req.note = new Note();
	next()
}, saveNoteAndRedirect('new'))

router.put('/:id', async function(req, res, next){
	req.note = await Note.findById(req.params.id)
	next()
}, saveNoteAndRedirect('edit'))

router.delete('/:id',async function(req,res){
	await Note.findByIdAndDelete(req.params.id)
	res.redirect('/')
}) 

function saveNoteAndRedirect(path){
	return async function(req, res){
		let note = req.note
		note.title = req.body.title
		note.description = req.body.description
		note.content = req.body.content
		try
		{
			note = await note.save()
			res.redirect(`/notes/${note.slug}`)
		}
		catch(e)
		{
			res.render(`notes/${path}`, {note : note})
		}
	}
}

module.exports = router
