import { getStudentByCertifcateId } from '@/server/add-student'
import { certificateType, studentType } from '@/types/studentType';
import Image from 'next/image';
import React from 'react'

const ViewCertificate = async({params}: {params:{id:string}}) => {
  const studentData:studentType | null|undefined = await getStudentByCertifcateId(params.id);
  if(!studentData) return "Not found"
  return (
    <div>
      <h1>
        {studentData.name}
      </h1>
      {
        studentData.certificateData as certificateType && (
          <iframe src={(studentData.certificateData as certificateType)?.src!} width={800} height={800} frameBorder={0}></iframe>
        )
      }
    </div>
  )
}

export default ViewCertificate
