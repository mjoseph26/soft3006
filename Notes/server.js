const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')
const noteRouter = require('./routes/notes')
const methodOverride = require('method-override')
const app = express()



mongoose.connect('mongodb://localhost/notebook', { useNewUrlParser: true, useUnifiedTopology: true,
useCreateIndex: true})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false}))
app.use(methodOverride('_method'))

app.get('/', async function(req,res){
	const notes = await Note.find().sort({ produced: 'desc'})
	res.render('notes/index', { notes : notes})
})


app.use('/notes',noteRouter)

app.listen(9000)