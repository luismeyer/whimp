import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Webcam from "react-webcam";

import { OWNERS_IMAGE_ROUTE } from "../App";
import { Gif } from "../components/gif";
import { apiUrl } from "../utils/const";

export const ParcelImage: React.FC = () => {
  const uploadRef = useRef<HTMLInputElement>(null);

  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = useState("");

  const [uploadLoading, setUploadLoading] = useState(false);

  const history = useHistory();

  const processImage = useCallback(
    async (body: BodyInit) => {
      setUploadLoading(true);

      const result = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body,
      }).then((res) => res.json());

      setUploadLoading(false);

      if (!result.success) {
        return;
      }

      history.push(`${OWNERS_IMAGE_ROUTE}?filename=${result.filename}`);
    },
    [setUploadLoading, apiUrl]
  );

  const onImageChange = useCallback(() => {
    if (!uploadRef.current || !uploadRef.current.files) {
      return;
    }

    const [file] = uploadRef.current.files;

    const formData = new FormData();
    formData.append("file", file);

    processImage(formData);
  }, [uploadRef, processImage]);

  const takeImage = useCallback(() => {
    if (!webcamRef.current) {
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      return;
    }

    setImage(screenshot);

    processImage(screenshot);
  }, [webcamRef, setImage, processImage]);

  return (
    <div>
      {uploadLoading ? (
        <>
          <h1>Bild wird hochgeladen</h1>
          <Gif name="Loading" />
        </>
      ) : (
        <>
          <h1>Mache ein Bild des Paket's</h1>

          {image ? (
            <img src={image} />
          ) : (
            <Webcam
              videoConstraints={{ facingMode: "environment" }}
              screenshotFormat="image/png"
              ref={webcamRef}
            />
          )}

          <button onClick={takeImage}>Foto aufnemhmen</button>
          <input type="file" ref={uploadRef} onChange={onImageChange} />
        </>
      )}
    </div>
  );
};
