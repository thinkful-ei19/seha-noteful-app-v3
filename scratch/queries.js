'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');


// mongoose.connect(MONGODB_URI)
//   .then(() => Note.createIndexes())
//   .then(() => {
//     return Note.find(
//       { $text: { $search: 'ways' } })
//       .then(results => {
//         console.log(results);
//       });
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// GET ALL find

mongoose.connect(MONGODB_URI)
  .then(() => {
    const searchTerm = 'gaga';
    let filter = {};

    if (searchTerm) {
      const re = new RegExp(searchTerm, 'i');
      filter.title = { $regex: re };
    }

return Note.find(
  { $text: { $search: 'ways' } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } })
  .then(results => {
    console.log(results);
  })

//     return Note.find(filter)
//       .sort('created')
//       .then(results => {
//         console.log(results);
//       })
//       .catch(console.error);
//   });

  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

// GET findById

mongoose.connect(MONGODB_URI)
  .then(() => {
    
    let id = '000000000000000000000002';

    return Note.findById(id)
      .then(results => {
        console.log(results);
      })
      .catch(console.error);
      res.status(500).json({ message: 'Internal server error' })
  })
  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

// Create a new note using Note.create

mongoose.connect(MONGODB_URI)
    .then(() => {
    const newItem = {
        title:'NewTitle',
        content: 'NewContent'
    };

    if(!newItem.title) {
        const err = new Error('Missing`title` in request body');
        console.error(err);
    }
    return Note
    .create(newItem)
        .then(results => {
            console.log(results);
        })
        .catch(console.error);
    })
    .then(() => {
        return mongoose.disconnect()
            .then(() => {
                console.info('Disconnected');
            });
    })
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    });
//Update a note by id using Note.findByIdAndUpdate

mongoose.connect(MONGODB_URI)

    .then(() => {

   const id = '000000000000000000000003';
   const updatedItem = {
      title: 'updatedTitle',
      content: 'updatedContent'
};

if (!updatedItem.title) {
    const err = new Error('Missing `title` in request body.');
    console.error(err);
}

return Note.findByIdAndUpdate(id, updatedItem, { new: true })
    .then(results => {
        console.log(results);
    })
    .catch(console.results);
})
 .then(() => {
    return mongoose.disconnect()
        .then(() => {
            console.info('Disconnected');
        });
})
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    )};

// Delete a note by id using Note.findByIdAndRemove

mongoose.connect(MONGODB_URI)
    .then(() => {
        const id = '000000000000000000000003';
        return Note.findByIdAndRemove(id)
            .then(() => {
                console.log('Deleted');
            })
            .catch(console.error);
    })
    .then(() => {
        return mongoose.disconnect()
        .then(() => {
            console.info('Disconnected');
        });
    })
    .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
    )};