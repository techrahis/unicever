"use client"
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter();
  return (
    <Button className='my-2' variant="secondary" onClick={()=>router.push('/app')}>
        <ChevronLeft />
    </Button>
  )
}

export default BackButton
