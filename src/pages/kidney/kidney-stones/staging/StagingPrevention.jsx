import { Environment } from '@react-three/drei'
import React from 'react'

const StagingPrevention = () => {
  return (
    <>
      <Environment
        files={[
          "px3.png",
          "nx3.png",
          "py3.png",
          "ny3.png",
          "pz3.png",
          "nz3.png",          
        ]}

        path = "/staging/staging-kidney-stones/escene-4/"
        background
      />
    </>
  )
}

export default StagingPrevention