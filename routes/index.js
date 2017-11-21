const express = require("express");
const router = express.Router();
const faker = require("faker");
const _ = require("lodash");

router.get("/api/:count", (req, res)=>{

    let data = _.range(req.params.count).map((i)=>{
        return {
            id: i,
            name: faker.name.findName(),
            gender: ["Male","Female"][Math.round(Math.random())],
            mobile: faker.phone.phoneNumberFormat(),
            email: faker.internet.email()
        }
    });

    return res.json(data);

});

module.exports = router;