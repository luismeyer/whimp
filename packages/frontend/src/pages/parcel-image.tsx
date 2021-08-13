import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import DefaultWebcam from "react-webcam";
import styled from "styled-components";

import { ERROR_ROUTE, OWNERS_IMAGE_ROUTE } from "../App";
import { StyledButton } from "../components/button";
import { Gif } from "../components/gif";
import { StyledHeadline } from "../components/headline";
import { Page } from "../components/page";
import { Webcam } from "../components/webcam";
import { apiUrl } from "../utils/const";

const StyledButtons = styled.div`
  display: grid;
  grid-gap: 8px;
`;

export const ParcelImage: React.FC = () => {
  const webcamRef = React.useRef<DefaultWebcam>(null);
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
          <StyledHeadline.h1>Bild wird hochgeladen</StyledHeadline.h1>
          <Gif name="Loading" />
        </>
      ) : (
        <>
          <StyledHeadline.h1>Mache ein Bild des Pakets</StyledHeadline.h1>

          {image ? <img src={image} /> : <Webcam ref={webcamRef} />}

          <StyledButtons>
            <StyledButton onClick={takeImage}>Foto aufnehmen</StyledButton>
          </StyledButtons>
        </>
      )}
    </Page>
  );
};
