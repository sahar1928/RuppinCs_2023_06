import React from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import ServiceDetails from '../Service/ServiceDetails'


const ServiceDetailsMain = () => {
  return (
    <main className='service-details-main'>
        <Breadcrumb topic={"Service Details"} topicSpan={"Service Details"}/>
        <ServiceDetails/>
    </main>
  )
}

export default ServiceDetailsMain