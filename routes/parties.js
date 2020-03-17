const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await fetch(`${process.env.API_URL}/party/${req.params.id}`);
    const response = await data.json();
    const { name, _id } = response;

    res.render('party', {
      party: response,
      title: name,
      url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${_id}`,
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetch(`${process.env.API_URL}/party/${id}`, {
      method: 'DELETE',
    });
    await data.json();
    res.redirect('/');
  } catch (error) {
    res.send(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    res.send(error);
  }
});

router.post('/:id/items', async (req, res) => {
  try {
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
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id/items/:itemId', async (req, res) => {
  const { id, itemId } = req.params;

  try {
    const data = await fetch(`${process.env.API_URL}/party/${id}/items/${itemId}`, {
      method: 'DELETE',
    });
    await data.json();
    res.redirect('back');
  } catch (error) {
    res.send(error);
  }
});

router.patch('/:id/items/:itemId', async (req, res) => {
  const { id, itemId } = req.params;

  try {
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
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;