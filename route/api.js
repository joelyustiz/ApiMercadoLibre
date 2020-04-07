'use strict';
const express = require('express');
const path = require('path');
const httpRequest = require('../utils/http');

function Api(app) {
  const router = express.Router();
  app.use('/api', router);

  router.get('/', async (req, res) => {
    let data = await httpRequest('https://api.mercadolibre.com/sites/MLA/search?q=telefonos');
    data = await JSON.parse(data);

    let list = data.results;
    let n, i, k, aux;
    n = list.length;

    for (k = 1; k < n; k++) {
      for (i = 0; i < n - k; i++) {
        if (list[i].price > list[i + 1].price) {
          aux = list[i];
          list[i] = list[i + 1];
          list[i + 1] = aux;
        }
      }
    }

    let result = list.map( item => {
      return {
        SellerId: item.id,
        SellerName: item.seller.eshop ?  item.seller.eshop.nick_name : null,
        Marca: item.value_name,
        EnvioGratis: item.shipping.free_shipping,
        TipoDeLogística: item.shipping.logistic_type,
        LugarDeOperaciónDelSeller: `${item.seller_address.country.name} ${item.seller_address.state.name} ${item.seller_address.city.name}`,
        CondicionDelArticulo: item.condition,
        RangoDePrecios: item.price
      };
    });
    console.log('list ------', result);

    res.send(result);
  });
}

module.exports = Api;
