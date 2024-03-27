import { getStudentByCertifcateId } from '@/server/add-student';
import { certificateType, studentType } from '@/types/studentType';
import PdfViewer from '../_components/PdfViewer';
import { getEventById } from '@/server/event-create';

const ViewCertificate = async({params}: {params:{id:string}}) => {
  const studentData:studentType | null|undefined = await getStudentByCertifcateId(params.id);
  const eventData = await getEventById(studentData?.eventId as string);
  if(!studentData) return "Not found"
  return (
    <div className='container'>
      <div>
        <h1>{studentData.name}</h1>
        <h1>{eventData?.title}</h1>
        <h2>{eventData?.location}</h2>
        <p>{eventData?.description}</p>
      </div>
      <PdfViewer studentData={studentData} />
    </div>
  )
}

export default ViewCertificate
