import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import Webcam from "react-webcam";
import styled from "styled-components";

import { ERROR_ROUTE, OWNERS_IMAGE_ROUTE } from "../App";
import { Gif } from "../components/gif";
import { Page } from "../components/page";
import { apiUrl } from "../utils/const";

const StyledButtons = styled.div`
  display: grid;
  grid-gap: 8px;
`;

export const ParcelImage: React.FC = () => {
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
      })
        .then((res) => res.json())
        .catch(() => ({
          success: false,
        }));

      setUploadLoading(false);

      if (!result.success) {
        history.push(ERROR_ROUTE);
        return;
      }

      history.push(`${OWNERS_IMAGE_ROUTE}?filename=${result.filename}`);
    },
    [setUploadLoading, apiUrl]
  );

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
    <Page>
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
              width="100%"
              screenshotFormat="image/png"
              ref={webcamRef}
            />
          )}

          <StyledButtons>
            <button onClick={takeImage}>Foto aufnehmen</button>
          </StyledButtons>
        </>
      )}
    </Page>
  );
};
