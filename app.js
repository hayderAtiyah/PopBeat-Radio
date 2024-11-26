const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views/pages');

//Done by Hayder
mongoose.connect('mongodb+srv://swe432:pineapple@project4.qwvwv.mongodb.net/?retryWrites=true&w=majority&appName=project4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas!");
}).catch((error) => {
    console.error("Error happened:", error);
});


//Done by Hayder
const reportSchema = new mongoose.Schema({
    dateOfAssign: String,
    producerName: String,
    songName: String,
    djName: String,
    playedOrNot: Boolean,
    details: String
}, { collection: 'reports' });


//Done by Hayder
const assignedDjSchema = new mongoose.Schema({
    djName: String,
    songName: String,
    dateOfAssign: String
}, { collection: 'assignedDj' });


//Done by Hayder
const Report = mongoose.connection.useDb('reports').model('Report', reportSchema);
const AssignedDJ = mongoose.connection.useDb('assignedDj').model('AssignedDJ', assignedDjSchema);


//Done by Hayder
async function fetchReports() {
    try {
        return await Report.find();
    } catch (error) {
        console.error("Error fetching reports:", error);
        return [];
    }
}


//Done by Hayder
async function fetchAssigned() {
    try {
        const data = await AssignedDJ.find();
        return data;
    } catch (error) {
        console.error("Error fetching assigned DJ:", error);
        return [];
    }
}

app.get('/api/assignedDjs', async(req, res) => {
    try {
        const data = await fetchAssigned();
        res.json(data); // Send data to the client
    } catch (error) {
        console.error("Error fetching assigned DJs:", error);
        res.status(500).json({ error: "Failed to fetch assigned DJs" });
    }
});



//Done by Hayder
app.get('/manager', async(req, res) => {
    const reports = await fetchReports();
    const assignedDj = await fetchAssigned();
    res.render('manager', {
        managerTitleName: "hss",
        taylorPicSrc: "/photos/taylorWallpaper.jpg",
        mangamentTitle: "PopBeat Radio Mangament",
        reports: reports,
        assignedDj: assignedDj
    });
});


//Done by Hayder
app.listen(3500, () => {
    console.log("Server running on port 3500");
});