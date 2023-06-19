const request  = require('request')
const cheerio = require('cheerio')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const cred = require('./cred.json')
const doc = new GoogleSpreadsheet('1iahDv4tBecvaM8GV4j7vghY-CZ_O5QFmipZojYhgJzI');
var url = "https://www.amazon.in/"
request(url,cb)
function cb(err,response,body){
    if(err){
        console.log(err)
    }
    else{
        getCategory(body)
    }
}
var category_array = []
function getCategory(body){
    let $ = cheerio.load(body)
    var data = $('select[data-nav-selected="0"]>option')
    for(var i=0;i<data.length;i++){
        var category = $(data[i]).text()
        category_array.push({'id':i+1,'type':category})
    }
    gs(category_array)

}
var sheet ;
async function gs(category_array){
    await doc.useServiceAccountAuth(cred)
    await doc.loadInfo();
    console.log(doc.title);
    sheet = doc.sheetsByIndex[0];
    console.log(sheet.title);
    var datas = category_array
    const Headers = ['id','type']
    await sheet.setHeaderRow(Headers)
    await sheet.addRows(category_array)
}