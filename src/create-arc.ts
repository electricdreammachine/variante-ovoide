import * as THREE from "three";

export function createExtrudedArcGeometry(
  innerRadius: number,
  outerRadius: number,
  depth: number,
  thetaStart: number,
  thetaLength: number,
  segments: number
) {
  const shape = new THREE.Shape();
  const x = Math.cos(thetaStart);
  const y = Math.sin(thetaStart);

  shape.moveTo(innerRadius * x, innerRadius * y);
  shape.lineTo(outerRadius * x, outerRadius * y);

  shape.absarc(0, 0, outerRadius, thetaStart, thetaStart + thetaLength, false);
  shape.lineTo(
    innerRadius * Math.cos(thetaStart + thetaLength),
    innerRadius * Math.sin(thetaStart + thetaLength)
  );
  shape.absarc(0, 0, innerRadius, thetaStart + thetaLength, thetaStart, true);

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: false,
    curveSegments: segments,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}
