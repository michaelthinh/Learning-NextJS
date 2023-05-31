// domain.com/
import Head from "next/head";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse some of our awesome but simple meetups with React"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;
//     // Fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },

//     };
// };

export const getStaticProps = async () => {
    // Fetch data from an API
    const client = await MongoClient.connect(
        "mongodb+srv://lamtieuki:CXNZrzYqdYklTdSg@cluster0.oudrdi3.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
};

export default HomePage;
