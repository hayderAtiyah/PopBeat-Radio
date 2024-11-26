const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));
app.use(express.json());
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
}, {
    collection: 'reports'
});


//Done by Hayder
const assignedDjSchema = new mongoose.Schema({
    djName: String,

    dateOfAssign: String
}, {
    collection: 'assignedDj'
});

const availableDjs = new mongoose.Schema({
    djName: String
}, {
    collection: 'availableDjs'
});

//Done by Hayder
const Report = mongoose.connection.useDb('reports').model('Report', reportSchema);
const AssignedDJ = mongoose.connection.useDb('assignedDj').model('AssignedDJ', assignedDjSchema);
const AvailableDjs = mongoose.connection.useDb('availableDjs').model('AvailableDjs', availableDjs);



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
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching assigned DJ:", error);
        return [];
    }
}


app.get('/api/assignedDjs', async(req, res) => {
    try {
        const data = await fetchAssigned();
        res.json(data);
    } catch (error) {
        console.error("Error fetching assigned DJs:", error);
        res.status(500).json({
            error: "Failed to fetch assigned DJs"
        });
    }
});




async function fetchAvailableDjs() {
    try {
        const data = await AvailableDjs.find();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching available Djs:", error);
        return [];
    }
}


app.get('/api/availableDjs', async(req, res) => {
    try {
        const data = await fetchAvailableDjs();
        res.json(data);
    } catch (error) {
        console.error("Error fetching Available Djs:", error);
        res.status(500).json({
            error: "Failed to fetch Available DJs"
        });
    }
});




//Done by Hayder
app.get('/manager', async(req, res) => {
    try {
        const reports = await fetchReports();
        const assignedDj = await fetchAssigned();
        const availableDjs = await fetchAvailableDjs();

        res.render('manager', {
            managerTitleName: "hss",
            taylorPicSrc: "/photos/taylorWallpaper.jpg",
            mangamentTitle: "PopBeat Radio Management",
            reports: reports,
            assignedDj: assignedDj,
            availableDjs: availableDjs,
        });
    } catch (error) {
        console.error("Error loading manager page:", error);
        res.status(500).send("Error loading manager page.");
    }
});


app.post('/api/deletedApplied', async(req, res) => {
    try {
        const {
            deleted
        } = req.body;


        for (const item of deleted) {
            await AssignedDJ.deleteOne({
                djName: item.djName,

                djDate: item.dateOfAssign
            });
        }
        res.status(200).json({
            message: "Changes applied successfully."
        });
    } catch (error) {
        console.error("Error applying changes:", error);
    }
});


app.post('/api/addedApplied', async(req, res) => {
    try {
        const {
            added
        } = req.body;


        console.log(added)

        for (const item of added) {
            const newData = new AssignedDJ({

                djName: item.djName,
                dateOfAssign: item.dateOfAssign
            });
            await newData.save();
            console.log("Saved Data:", newData);
        }

        res.status(200).json({
            message: "Changes applied successfully."
        });
    } catch (error) {
        console.error("Error applying changes:", error);
    }
});





//Done by Hayder
app.listen(3500, () => {
    console.log("Server running on port 3500");
});