const express = require('express');
const Schemes = require('./scheme-model.js');
const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
  .then(steps => {
    res.json(steps);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
  
});

router.get('/:id/steps', async (req, res) => {
  try {
    const steps = await Schemes.findSteps(req.params.id)
    res.json(steps);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', (req, res) => {
  const schemeData = req.body;
  Schemes
    .add(schemeData)
    .then(scheme => {
      return res.status(201).json(scheme);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ 
        message: 'Failed to create new scheme' 
      });
    });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes
    .findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.addStep(stepData, id)
        .then(step => {
          res.status(201).json(step);
        })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
});

router
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.update(changes, id)
      .then(updatedScheme => {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;