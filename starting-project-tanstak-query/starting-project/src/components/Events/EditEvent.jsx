import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../util/fetchEvents.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params=useParams();
  const {data,isError,isPending}=useQuery({
    queryKey:["events",params.id],
    queryFn:({signal})=>fetchEvent({id:params.id,signal})
  })
  const {mutate,isError:errorUpdate,error}=useMutation({
  mutationFn:updateEvent,
  onSuccess:async (data)=>{
    const newData=data.event;
    await queryClient.cancelQueries(["events",params.id]);
    const previousEvent=queryClient.getQueryData(["events",params.id])
    queryClient.setQueryData(["events",params.id],newData);
    return {previousEvent}
  },
  onError:(error,data,context)=>{
    queryClient.setQueryData(["events",params.id],context.previousEvent);
  },
  onSettled:()=>{
    queryClient.invalidateQueries(["events",params.id])
  }
  })
  function handleSubmit(formData) {
    mutate({id:params.id,event:formData})
    navigate("../")
  }

  function handleClose() {
    navigate('../');
  }
  if(isError){
    return <ErrorBlock title="error" message="error"/>
  }
  if(isPending){
    return <p>loading...</p>
  }
  if(errorUpdate){
    return <ErrorBlock title="error" message={error.info?.message}/>
  }
  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
