require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/db/db');


const PORT = process.env.PORT || 5000;  // instead of giving direct port no. we give it as variable means is port is available like 3000, 8000 is work and if noo port free then 5000


async function startServer(){
    try{
        await connectDB();

        app.listen(PORT, ()=>{
           console.log(`Server is running on port number ${PORT}`);
        });

    }catch(error){
        console.error("Failed to start server:",error.message);
        process.exit(1);
    }

}

startServer();
