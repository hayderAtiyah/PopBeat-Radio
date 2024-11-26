const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views/pages');

mongoose.connect('mongodb+srv://swe432:pineapple@project4.qwvwv.mongodb.net/reports?retryWrites=true&w=majority&appName=project4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas!");
}).catch((error) => {
    console.error("Error happened:", error);
});

const reportSchema = new mongoose.Schema({
    dateOfAssign: String,
    producerName: String,
    songName: String,
    djName: String,
    playedOrNot: Boolean,
    details: String
}, { collection: 'reports' });

const Report = mongoose.model('Report', reportSchema);

async function fetchReports() {
    try {
        return await Report.find();
    } catch (error) {
        console.error("Error fetching reports:", error);
        return [];
    }
}


app.get('/manager', async(req, res) => {
    const reports = await fetchReports();
    res.render('manager', {
        managerTitleName: "hss",
        taylorPicSrc: "/photos/taylorWallpaper.jpg",
        mangamentTitle: "PopBeat Radio Mangament",
        reports: reports
    });
});

app.listen(3500, () => {
    console.log("Server running on port 3500");
});