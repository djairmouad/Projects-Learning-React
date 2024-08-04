import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../util/fetchEvents.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetails() {
  const params=useParams();
  const id=params.id;
  const navigate=useNavigate()
  const {data,isLoading, error}=useQuery({
    queryKey:["events", id],
    queryFn:({signal})=> fetchEvent({id,signal})
  });
  const {mutate,isPending}=useMutation({
    mutationFn:deleteEvent,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["events"],
        refetchType:"none"
      })
      navigate("/events");
    }
  })
  function heandelDelete(id){
    mutate({id});
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <LoadingIndicator/>}
      {!isPending && <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={()=>heandelDelete(id)}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/`+ data.image} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>}
      
    </>
  );
}
