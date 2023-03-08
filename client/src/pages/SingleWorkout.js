import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUT } from '../utils/queries';
import Auth from '../utils/auth';

function SingleWorkout(props) {
    const { id: workoutId } = useParams();
    const { loading, data } = useQuery(QUERY_WORKOUT, {
        variables: { id: workoutId }
    });
    const workout = data?.workout || {};

    console.log(workout)
    if (loading) {
        return <section>loading...</section>
    }

    return (
        <section>
            workout stuff goes here
        </section>
    )
};

export default SingleWorkout;