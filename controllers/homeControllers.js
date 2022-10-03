const Note = require('../models/notes');

module.exports.home = async function(req, res){
    try {
        const options = {
            page: req.params.page || 1, 
            limit: 6,
            sort: '-pinned -createdAt',
            collation: {
                locale: 'en'
            }
        };
        let notes = await Note.paginate({}, options);
        return res.render('home', {
            notes: notes.docs,
            prevPage: notes.hasPrevPage,
            nextPage: notes.hasNextPage,
            currPage: notes.page
        });
    } catch (error) {
        req.flash('error', 'Internal Server error');
        return res.redirect('back');
        // return res.status(500).json({
        //     message: 'Internal server error',
        //     error: error
        // });
    }
}

module.exports.addNote = async function(req, res){
    try {
        let note = await Note.create({
            title: req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1),
            tag: req.body.tag.charAt(0).toUpperCase() + req.body.tag.slice(1),
            note: req.body.note
        });
        req.flash('success', 'Note Added!!');
        return res.redirect('back');
        // return res.render('home');
    } catch (error) {
        req.flash('error', 'Internal Server error');
        return res.redirect('back');
        // return res.status(500).json({
        //     message: 'Internal server error',
        //     error: error
        // });
    }
}


module.exports.updateNote = async function(req, res){
    try {
        // first find the note of that id
        let note = await Note.findById({_id: req.params.id});
        if(note){
            note.title = req.body.title;
            note.tag = req.body.tag;
            note.note = req.body.note;
            note.save();
            req.flash('success', 'Note Updated!!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized Note!!');
            return res.redirect('back');
            // return res.status(401).json({
            //     message: 'Unauthorized notes'
            // });
        }
    } catch (error) {
        req.flash('error', 'Internal server error');
        return res.redirect('back');
        // return res.status(500).json({
        //     message: 'Internal server error',
        //     error: error
        // });
    }
}


module.exports.deleteNote = async function(req, res){
    try {
        let note = await Note.findById(req.params.id);
        if(note){
            note.delete();
            req.flash('success', 'Note Deleted!!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Note not found');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Internal Server error');
        return res.redirect('back');
    }
}


module.exports.togglePinned = async function(req, res){
    try {
        let note = await Note.findById(req.params.id);
        if(note){
            note.pinned = !note.pinned;
            note.save();
            req.flash('success', note.pinned ? 'Note Pinned' : 'Note Unpinned');
            return res.redirect('back');
        } else {
            req.flash('error', 'Note not found');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Internal Server error');
        return res.redirect('back');
    }
}