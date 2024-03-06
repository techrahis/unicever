import { auth } from '@/auth'
import { getOrganization } from '@/server/organization-crud';
import React from 'react'
import CreateEvent from '../_components/CrateEvent';
import { getEventById } from '@/server/event-create';

const Event = async({params}:{params:{id:string}}) => {
  const session = await auth();
  const organizationDetails = await getOrganization(session?.user.id!);
  const eventDetails = await getEventById(params.id);
  console.log(eventDetails?.date)
  return (
    <div>
      <CreateEvent organization={organizationDetails} id={params.id} eventDetails={eventDetails} />
    </div>
  )
}

export default Event
