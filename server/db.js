import { connect, set } from 'mongoose';
const mongoURI =  "mongodb+srv://blokhinamaria:kyNUv8Raq4GltP82@cluster0.eldoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Suppress Mongoose strictQuery warning
set('strictQuery', false);

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await connect(mongoURI, { dbName: 'stayhealthybeta1'});
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};

export default connectToMongo;