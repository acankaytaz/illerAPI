const express = require('express')
const app = express()

app.use(express.json())

const iller = [{
        plaka: 41,
        ilAdi: "kocaeli"
    },
    {
        plaka: 34,
        ilAdi: "istanbul"
    }
]

app.get('/', (req, res) => {
    res.send('welcome!')
})

//GET
app.get('/api/iller', (req, res) => {
    res.send(iller)
})

app.get('/api/iller/:plaka', (req, res) => {
    const il = iller.find(i => i.plaka === parseInt(req.params.plaka))
    if (!il) res.status(404).send('Aranan plaka numarali sehir bulunamadi')
    res.send(il)
})

//POST
app.post('/api/iller', (req, res) => {

    if (!req.body.ilAdi || req.body.ilAdi.length < 3) {
        return res.status(400).send('aranan il en az 3 karaktere sahip olmali')
    }

    // ayni il mevcutsa ekleme
    const ilAd = iller.find(i => i.ilAdi === (req.body.ilAdi))
    if (!ilAd && !iller.find(i => i.plaka === parseInt(req.body.plaka))) {
        const ilEkle = {
            plaka: req.body.plaka,
            ilAdi: req.body.ilAdi
        }
        iller.push(ilEkle)
        res.send(ilEkle)
    } else {
        return res.status(404).send('bu il zaten mevcut')
    }
})

//PUT
app.put('/api/iller/:plaka', (req, res) => {
    const il = iller.find(i => i.plaka === parseInt(req.params.plaka))
    if (!il) res.status(404).send('Aranan plaka numarali sehir bulunamadi')

    if (!req.body.ilAdi || req.body.ilAdi.length < 3) {
        return res.status(400).send('aranan il en az 3 karaktere sahip olmali')
    }

    il.ilAdi = req.body.ilAdi;
    res.send(il)

})

app.delete('/api/iller/:plaka', (req, res) => {
    const il = iller.find(i => i.plaka === parseInt(req.params.plaka))
    if (!il) return res.status(404).send('Aranan plaka numarali sehir bulunamadi')

    //delete
    const index = iller.indexOf(il)
    iller.splice(index, 1)

    res.send(il)

})





const port = 3040
app.listen(port, () => console.log(`${port} numarali port dinleniyor..`))






// //POST
// app.post('/api/iller', (req, res) => {
//     if (!req.body.ilAdi || req.body.ilAdi.length < 3) {
//         return res.status(400).send('aranan il en az 3 karaktere sahip olmali')
//     }

//     // ayni il mevcutsa ekleme
//     const il = iller.find(i => i.plaka === parseInt(req.params.plaka))
//     if (il) res.status(404).send('zaten mevcut')


//     const ilEkle = {
//         ilAdi: req.body.ilAdi,
//         plaka: req.body.plaka
//     }
//     iller.push(ilEkle)
//     res.send(ilEkle)
// })