// our-domain.com/new-meetup

import { useRouter } from 'next/router.js';
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';
import Head from 'next/head';

export default function NewMeetupPage () {
    const router = useRouter();

    async function AddMeetupHandler (enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        router.push('/')
    }
    return (
        <>
            <Head>
                <title>Add A New Meetup</title>
                <meta name='description' content='Add your own meetups and create amazing networking opportunities.' />
            </Head>
            <NewMeetupForm onAddMeetup={AddMeetupHandler} />
        </>
    )
}   