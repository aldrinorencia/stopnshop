const express = require('express');
const router = express.Router(); // eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json', { shops: [] });

router.get('/', (req, res, next) => {
    console.log('Index page only');
    next();
}, (req, res) => {
    res.json(store.get('shops'));
});

router.get('/:id', (req, res) => {
    let shop = {};
    const shops = store.get('shops');
    shop = shops.find(shops => parseInt(shops.id) === parseInt(req.params.id));
    res.json(shop);
});

router.post('/', (req, res) => {
    const shops = store.get('shops');
    const newNote = {
        id: shops.length > 0 ? shops[shops.length - 1].id + 1 : 1,
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        files: req.body.files,
        imgproduct: req.body.imgproduct
    };

    shops.push(newNote);
    store.set('shops', shops);

    res.json(store.get('shops'));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const shops = store.get('shops');

    for(var i = 0; i < shops.length; i++) {
        if(parseInt(shops[i].id) === parseInt(id)) {
            shops[i].title = req.body.title;
            shops[i].quantity = req.body.quantity;
            shops[i].price = req.body.price;
            shops[i].files = req.body.files;
            shops[i].imgproduct = req.body.imgproduct;
            break;
        }
    }

    store.set('shops', shops);
    res.json(store.get('shops'));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const shops = store.get('shops');
    const newNote = shops.filter(shop => parseInt(shop.id) !== parseInt(id));

    store.set('shops', newNote);
    res.json(store.get('shops'));
});

module.exports = router;