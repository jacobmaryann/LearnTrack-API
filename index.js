import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/Configs/Database.js'
import app from './src/App.js'


const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Welcome to LearnTrack learning platform');
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});