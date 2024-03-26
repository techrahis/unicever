import { getStudentByCertifcateId } from '@/server/add-student';
import { certificateType, studentType } from '@/types/studentType';
import PdfViewer from '../_components/PdfViewer';

const ViewCertificate = async({params}: {params:{id:string}}) => {
  const studentData:studentType | null|undefined = await getStudentByCertifcateId(params.id);
  if(!studentData) return "Not found"
  return (
    <div>
      <h1>
        {studentData.name}
      </h1>
      <PdfViewer studentData={studentData} />
    </div>
  )
}

export default ViewCertificate
