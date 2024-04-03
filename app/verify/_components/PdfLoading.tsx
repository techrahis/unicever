import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PdfLoading = () => {
  return (
    <div >
      <Skeleton className='md:w-[500px] w-[300px] h-[200px] md:h-[350px]'/>
    </div>
  )
}

export default PdfLoading
