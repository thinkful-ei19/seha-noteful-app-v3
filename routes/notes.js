'use strict';

const express = require('express');
// Create an router instance (aka "mini-app")
const router = express.Router();

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
const Note = require('../models/note');

/* ========== GET/READ ALL ITEM ========== */
router.get('/notes', (req, res, next) => {

  const searchTerm = req.query.searchTerm;
  let filter= {};

  if(searchTerm){
    const re = new RegExp(searchTerm, 'i');
    filter.title = { $regex: re };
  }
  
  return Note.find(filter)
    .sort('created')
    .then(results => {
      res.json(results);
    })
    .catch(next);

//   res.json([
//     { id: 1, title: 'Temp 1' }, 
//     { id: 2, title: 'Temp 2' }, 
//     { id: 3, title: 'Temp 3' }
//   ]);

});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/notes/:id', (req, res, next) => {
  const {id} = req.params.id;

  return Note.findById(id)
    .then(results => {
      if (results) {
        res.json(results);
      } else{
        next();
      }
    })
    .catch(err =>{
      next(err);
    });

});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/notes', (req, res, next) => {

  const newItem= {
    title: req.body.title,
    content: req.body.content
  };

  return Note.create(newItem)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(next);
});



/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/notes/:id', (req, res, next) => {

  const id = req.params.id;
  const updatedItem = {
    title: req.body.title,
    content: req.body.content
  };

  if (!updatedItem.title) {
    const err = new Error('Missing `title` in request body.');
    console.error(err);
  }

  return Note.findByIdAndUpdate(id, updatedItem, { new: true })
    .then(results => {
      res.json(results).status(200);
    })
    .catch(next);
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/notes/:id', (req, res, next) => {

  const id = req.params.id;

  return Note.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

module.exports = router;