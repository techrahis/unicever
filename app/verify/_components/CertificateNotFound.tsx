import React from 'react'
import CertificateNotfoundSvg from '@/public/certificate-notfound.svg'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
const CertificateNotFound = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="grid gap-3">
      <div className="md:w-[20rem] md:h-[20rem] relative h-[12rem] w-[12rem] overflow-hidden">
        <Image src={CertificateNotfoundSvg} alt="not-found" fill/>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
      <p>Certificate Not Found</p>
      <Link href='/app' className={buttonVariants({variant:"secondary"})}>Back to Home &#11127;</Link>
      </div>
    </div>
  </div>
  )
}

export default CertificateNotFound
