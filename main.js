const express = require('express');
const db = require('monk')('mongodb+srv://ghm_gos:Switch2electric@gos.y4ufxec.mongodb.net/?retryWrites=true&w=majority')
var bodyParser = require('body-parser')
const productsdb = db.get('products');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/create", function (req, res) {



    res.status(200).send({

        "status": "good",

        "msg": "document created "
    })


});



app.get("/read", function (req, res) {

    console.log("read preformed");




    res.status(200).send({

        "status": "good",

        "msg": "query fetch completed"

    })


});




app.put("/update", function (req, res) {

    res.status(200).send({



        "status": "good",


        "msg": "data has been updated"
    })


});



app.delete("/delete", function

    (req, res) {

    console.log("request for delete the document ");


    res.status(200).send({
        "msg": "the document has been deleted successfully !",
        "status": "good"


    })



}


);


///// qno 2 olx


app.post("/addproduct", function (req, res) {

    var price = req.body["price"];
    var product_name = req.body["name"];
    var period = req.body["period"];


    if (price != undefined && typeof (price) == "number" && product_name != undefined && period != undefined && typeof (period) == "number") {


        productsdb.insert({

            "name": product_name,
            "price": price,
            "period": period

        }).then(function () {


            res.send({
                "status": "good",
                "msg": "the product has been added"
            });

        });





    }
    else {

        res.send({
            "status": "bad",
            "msg": "please fill all fields"
        })
    }






});




app.get("/search", function (req, res) {

    if (req.query["q"] != undefined) {
        productsdb.find
            ({

                name: {
                    $regex: req.query["q"],
                    $options: 'i' //i: ignore case, m: multiline, etc
                }
            }).then(function (Ee) {
                res.send(Ee);
            })
    }
    else {

        res.send({
            "status": "bad",
            "msg": "ERROR !"
        })
    }



})


app.post("/update", function (req, res) {

    var price = req.body["price"];
    var period = req.body["period"];

    var name = req.body["name"];


    if (name != undefined) {

        if (price != undefined && period != undefined) {


            productsdb.update({
                "name": name
            }, {
                $set: {
                    "price": price,
                    "period": period

                }
            }).then(function(){
                res.send({
                    "status":"good",
                    "msg":"price and period updated"
                })
            })

        }
       else if (price != undefined) {


            productsdb.update({
                "name": name
            }, {
                $set: {
                    "price": price,


                }
            }).then(function(){
                res.send({
                    "status":"good",
                    "msg":"price updates"
                })
            })

        }
       else if (period != undefined) {


            productsdb.update({
                "name": name
            }, {
                $set: {

                    "period": period

                }
            }).then(function(){
                res.send({
                    "status":"good",
                    "msg":"period updates"
                })
            })

        }
        else{


            res.send({
                "status":"bad",
                "msg":"please fill all the fields"
            })
        }


    }
    else {
        res.send({
            "msg": "no key",
            "status": "bad"
        })
    }





})



app.get("/delete", function (req, res) {


    var productid = req["id"];


    if (productid != undefined && productid != "") {


        console.log("deleting product");

        productsdb.remove({

            "_id": productid
        }).then(function () {

            console.log("product deleted");

            req.send({
                "status": "good",
                "msg": "product has been deleted"
            });


        })

    }


});














app.listen(3000, function () {
    console.log("the server is on localhost:3000");

})

