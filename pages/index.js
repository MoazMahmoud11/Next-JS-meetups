import Head from "next/head";
import { connectDatabase } from "../libF/db.js";

import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // Fetch Data From an API or file System
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS, // runs in every coming Request No need to Revalidate
//         }
//     }
// }

export async function getStaticProps() {
  // fetch data from an API
  // fetch('/api/meetups') // removed to avoid unnecessary requests of revalidate
  const client = await connectDatabase();

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();



  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })), // we no longer need useEffect and useState by this function
    },
    revalidate: 10,
  }; // obj
}

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first meetup.',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Broadway_tower_edit.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A second meetup.',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a second meetup!'
//     },
// ]
