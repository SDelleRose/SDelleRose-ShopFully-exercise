const express = require('express');
const router = express.Router();
const fs =require('fs')
const csvjson = require('csvjson');
const path=require('path')

// create json from CSV
var data = fs.readFileSync(path.join('./data/flyers_data.csv'), { encoding : 'utf8'});
const flyersData=csvjson.toObject(data)

// real current date for real flyers
/*
  let date= new Date();
  let YearMonthDay=date.getFullYear()(date.getMonth()+1)date.getDate();
*/
let fake_current_date = 20190504;

// delete duplicate, unpublished and expired flyers
function optimizeJson(array) {
    let newArr = [];
    let found;

    for (i = 0; i < array.length; i++) {
        found = undefined;

        if ((array[i].is_published != 0) && ((array[i].end_date.replace(/-/g, '') * 1) > fake_current_date)) {
            
            for (e = 0; e < newArr.length; e++) {

                if ((array[i].title === newArr[e].title) &&
                    (array[i].retailer === newArr[e].retailer) &&
                    (array[i].end_date === newArr[e].end_date)) {
                    found = true;
                    break;
                }
            }
        } else {
            continue
        }
        


        if (!found) {
            newArr.push(array[i]);
        }
    }
    return newArr;
}

const newFlyersData = optimizeJson(flyersData);


// handle incoming request
router.get('/', (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startJson = (page - 1) * limit;
    const endJson = page * limit;

    // tot request pages
    const number_pages = Math.ceil(newFlyersData.length / limit);

    // required part of the json
    const resultJson = newFlyersData.slice(startJson, endJson)

    // elements for page
    const number_elements_page=resultJson.length
    
    res.status(200).json(
        {
            pages: number_pages,
            items:number_elements_page,
            data: resultJson
        }
    );
});


module.exports = router;