// domain.com/[meetupId]
import Head from "next/dist/next-server/lib/head";

import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect(
        "mongodb+srv://lamtieuki:CXNZrzYqdYklTdSg@cluster0.oudrdi3.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(
        "mongodb+srv://lamtieuki:CXNZrzYqdYklTdSg@cluster0.oudrdi3.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });
    client.close();
    // Fetch data for a single meet up
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        },
    };
};

export default MeetupDetails;
