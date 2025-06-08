import { Environment } from '@react-three/drei'
import { path } from 'framer-motion/client'
import React from 'react'

const StaggingTreatment = () => {
  return (
    <>
      <Environment
        files={[
          "px2.png",
          "nx2.png",
          "py2.png",
          "ny2.png",
          "pz2.png",
          "nz2.png",
        ]}

        path = "/staging/staging-kidney-stones/escene-3/"
        background
      />
    </>
  )
}

export default StaggingTreatment