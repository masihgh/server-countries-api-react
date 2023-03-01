const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3001;

let data = require('./data.json')
app.use(cors({
  origin: '*'
}))

app.get('/', (req, res) => {
  res.send(data)
})
app.get('/info', (req, res) => {
  res.send({
    'items':data.length
  })
})

app.get('/home', (req, res) => {
  let D2 = data.map((Country) => {
    return {
      'id':Country.alpha3Code,
      'name':Country.name,
      'flag':Country.flag,
      'capital':Country.capital,
      'region':Country.region,
      'population':Country.population
    };
  })
  res.send(D2)
})
app.get('/regions', (req, res) => {
  res.send([
    { "Code": "AF", "Name": "Africa" },
    { "Code": "AM", "Name": "Americas" },
    { "Code": "OC", "Name": "Oceania" },
    { "Code": "AN", "Name": "Antarctic" },
    { "Code": "AS", "Name": "Asia" },
    { "Code": "EU", "Name": "Europe" },
  ])
})
app.get('/country/:name', (req, res) => {
  let Country = data.filter(e => e.alpha3Code == req.params.name);
  Country = Country[0]
  res.send({
    'id':Country.alpha3Code,
    'name':Country.name,
    'nativeName':Country.nativeName,
    'flag':Country.flag,
    'population':Country.population,
    'region':Country.region,
    'subregion':Country.subregion,
    'capital':Country.capital,
    'topLevelDomain':Country.topLevelDomain[0],
    'curency':Country.currencies[0].name,
    'languages':Country.languages,
    'borders':Country.borders?.map(border => {return data.filter(country => country.alpha3Code == border)[0]}),
    
  })

  // res.send(filteredData);
  // let Country = Object.values(filteredData)
  // Country = Country[0]
  
})

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})
