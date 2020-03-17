const fetch = require('node-fetch');
const express = require('express');
const asyncMiddleware = require('../middlewares/async');
const router = express.Router();

router.post('/', asyncMiddleware(async (req, res) => {
  const data = await fetch(`${process.env.API_URL}/party`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(req.body)
  });

  const { _id } = await data.json();
  res.redirect(`/party/${_id}`);
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
  const data = await fetch(`${process.env.API_URL}/party/${req.params.id}`);
  const response = await data.json();
  const { name, _id } = response;

  res.render('party', {
    party: response,
    title: name,
    url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${_id}`,
  });
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const data = await fetch(`${process.env.API_URL}/party/${id}`, {
    method: 'DELETE',
  });
  await data.json();
  res.redirect('/');
}));

router.patch('/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const data = await fetch(`${process.env.API_URL}/party/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(req.body)
  });
  await data.json();
  res.redirect('back');
}));

router.post('/:id/items', asyncMiddleware(async (req, res) => {
  const data = await fetch(`${process.env.API_URL}/party/${req.params.id}/items`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(req.body)
  });

  await data.json();
  res.redirect('back');
}));

router.delete('/:id/items/:itemId', asyncMiddleware(async (req, res) => {
  const { id, itemId } = req.params;
  const data = await fetch(`${process.env.API_URL}/party/${id}/items/${itemId}`, {
    method: 'DELETE',
  });
  await data.json();
  res.redirect('back');
}));

router.patch('/:id/items/:itemId', asyncMiddleware(async (req, res) => {
  const { id, itemId } = req.params;
  const data = await fetch(`${process.env.API_URL}/party/${id}/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(req.body)
  });
  await data.json();
  res.redirect('back');
}));

module.exports = router;