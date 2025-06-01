import { Backdrop, ContactShadows, Environment, Sky, Sparkles, Stage } from "@react-three/drei";
import React from "react";

const StagingSymptoms = () => {
  return (
    <>
      <Environment
        files={[
          "px.png",
          "nx.png",
          "py.png",
          "ny.png",
          "pz.png",
          "nz.png",
        ]}
        path='/staging/staging-kidney-stones/escene-2/'
        // ground={{
        //     height: 60,
        //     radius: 100,
        //     scale: 4,
        // }}
        background

      />
      {/* <Sparkles
        count={300} // Number of particles (default: 100)
        speed={1.5} // Speed of particles (default: 1)
        opacity={2} // Opacity of particles (default: 1)
        color={"cyan"} // Color of particles (default: 100)
        size={7} // Size of particles (default: randomized between 0 and 1)
        scale={[10, 10, 10]} // The space the particles occupy (default: 1)
        noise={1} // Movement factor (default: 1)
        position={[0,5,0]}
      /> */}
    </>
  );
};

export default StagingSymptoms;
