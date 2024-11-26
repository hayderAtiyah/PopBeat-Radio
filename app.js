const express = require('express')
const app = express()
app.use(express.static('public'));




app.set('view engine', 'ejs');
app.set('views', './views/pages');

app.locals.managerTitleName = "mana"

app.get("/manager", (req, res) => {
    res.render('manager', { managerTitleName: "hss", taylorPicSrc: "/photos/taylorWallpaper.jpg", mangamentTitle: "PopBeat Radio Mangament" })
});



app.listen(3500, () => {
    console.log("running")
})