const { GoogleSpreadsheet } = require('google-spreadsheet');
const category_data = require('./scrapecategory.js')
const cred = require('./cred.json')
const doc = new GoogleSpreadsheet('1iahDv4tBecvaM8GV4j7vghY-CZ_O5QFmipZojYhgJzI');
async function gs(){
    await doc.useServiceAccountAuth(cred)
    await doc.loadInfo();
    console.log(doc.title);
    console.log(category_data)
}
gs()