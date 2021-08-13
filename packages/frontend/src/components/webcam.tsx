import React from "react";
import DefaultWebcam from "react-webcam";

import { Color } from "../utils/colors";

export const Webcam = React.forwardRef<DefaultWebcam, {}>((_, ref) => {
  return (
    <DefaultWebcam
      videoConstraints={{ facingMode: "environment" }}
      style={{
        border: `10px solid ${Color.secondary}`,
        width: "calc(100% - 20px)",
        maxHeight: "300px",
        borderRadius: "4px",
        margin: "12px 0",
      }}
      forceScreenshotSourceSize={true}
      screenshotFormat="image/png"
      ref={ref}
    />
  );
});
