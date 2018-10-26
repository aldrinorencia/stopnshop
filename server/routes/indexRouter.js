const express = require('express');
const router = express.Router(); // eslint-disable-line
const axios = require('axios');
const PORT = 3300;

let isSuccess = false;
let message = '';

// route using express js
router.get('/', (req, res) => {
    let shops = [];
    axios.get(`http://localhost:${PORT}/shops`)
        .then((response) => {
            shops = response.data;
            const model = {
                title: req.viewModel.title,
                seasons: ["a", "b", "c", "d"],
                shop: shops,
                isSuccess: isSuccess,
                message: message
            };
            isSuccess = false;
            res.render('index', model);
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});



router.post('/shops_update/:id', (req, res) => {
    axios.put(`http://localhost:${PORT}/shops/${req.params.id}`, req.body)
        .then((response) => {
            isSuccess = true;
            message = 'It has been successfully updated.';
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});

router.post('/shops_delete/:id', (req, res) => {
    axios.delete(`http://localhost:${PORT}/shops/${req.params.id}`)
        .then((response) => {
            isSuccess = true;
            message = 'It has been successfully deleted.';
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});

router.post('/shops_add', (req, res) => {
    axios.post(`http://localhost:${PORT}/shops`, req.body)
        .then((response) => {
            isSuccess = true;
            message = 'It has been successfully added.';
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});


module.exports = router;