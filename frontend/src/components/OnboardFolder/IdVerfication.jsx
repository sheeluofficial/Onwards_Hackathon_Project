import { Avatar, Box, FormControl, FormLabel, Grid, Heading, Image, Input } from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const IdVerfication = ({ addharBack, addharFront, setAddharBack, setAddharFront }) => {
  const [urlF, seturlF] = useState("");
  const [urlB, seturlB] = useState("");

  // FOR ADDHAR FRONT IMAGE
  const [isDraggingFront, setIsDraggingFront] = useState(false);
  const fileInputRefFront = useRef(null);

  const selectFileFront = () => {
    fileInputRefFront.current.click();
  };
  const onFileSelectFront = (e) => {
    let file = e.target.files;
    if (file.length === 0) return;
    if (file[0].type.split("/")[0] !== "image") return;
    let u = URL.createObjectURL(file[0]);
    seturlF(u);
    setAddharFront(file[0]);
  };
  const onDragOverFront = (e) => {
    e.preventDefault();
    setIsDraggingFront(true);
    // console.log("ONDROPOVER  Front ADDHAR",e);
    e.dataTransfer.dropEffect = "copy";
  };
  const onDragLeaveFront = (e) => {
    e.preventDefault();
    setIsDraggingFront(false);
    // console.log("ONDROP Front ADDHAR",e);
  };
  const onDropFront = (e) => {
    e.preventDefault();
    setIsDraggingFront(false);
    let u = URL.createObjectURL(e.dataTransfer.files[0]);
    seturlF(u);
    setAddharFront(e.dataTransfer.files[0]);
  };

  // FOR ADDHAR BACK IMAGE
  const [isDraggingBack, setIsDraggingBack] = useState(false);
  const fileInputRefBack = useRef(null);

  const selectFileBack = () => {
    fileInputRefBack.current.click();
  };
  const onFileSelectBack = (e) => {
    let file = e.target.files;
    if (file.length === 0) return;
    if (file[0].type.split("/")[0] !== "image") return;
    let u = URL.createObjectURL(file[0]);
    seturlB(u);
    setAddharBack(file[0]);
  };
  const onDragOverBack = (e) => {
    e.preventDefault();
    setIsDraggingBack(true);
    // console.log("ONDROPOVER  BACK ADDHAR",e);
    e.dataTransfer.dropEffect = "copy";
  };
  const onDragLeaveBack = (e) => {
    e.preventDefault();
    setIsDraggingBack(false);
    // console.log("ONDROP BACK ADDHAR",e);
  };
  const onDropBack = (e) => {
    e.preventDefault();
    setIsDraggingBack(false);
    let u = URL.createObjectURL(e.dataTransfer.files[0]);
    seturlB(u);
    setAddharBack(e.dataTransfer.files[0]);
  };

  return (
    <Box>
      <FormControl isRequired>
        <Grid
          w={{ lg: "552px" }}
          h={{ lg: "176px" }}
          templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(1,1fr)" }}
          gap={"24px"}
        >
          <Box>
            {/* ADDHAR FRONT IMAGE */}
            <FormLabel as={"h6"}>Upload the front side of your Aadhaar</FormLabel>
            <Box display={"flex"} justifyContent={"space-between"} gap={3}>
              <Box
                className="drag-area"
                width={"90%"}
                border={"1px dashed grey"}
                display={"flex"}
                userSelect={"none"}
                alignItems={"center"}
                justifyContent={"center"}
                bgColor={"white"}
                borderRadius={5}
                py={"12px"}
                onDragOver={onDragOverFront}
                onDragLeave={onDragLeaveFront}
                onDrop={onDropFront}
              >
                {isDraggingFront ? (
                  <span className="select">Drag and Drop here</span>
                ) : (
                  <>
                    <span style={{ marginRight: "4px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12ZM12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"
                          fill="#87D5AE"
                        />
                      </svg>
                    </span>
                    {"  "} Drag and Drop or {""}
                    <span className="select" role="button" onClick={selectFileFront}>
                      Browse
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  className="file"
                  ref={fileInputRefFront}
                  onChange={onFileSelectFront}
                />
              </Box>
              {addharFront === "" ? (
                <Box borderRadius={"50%"} border={"1px solid grey"} p={"8px"} bgColor={"white"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M15.9993 23.3333C17.666 23.3333 19.0829 22.7502 20.25 21.584C21.4162 20.4169 21.9993 19 21.9993 17.3333C21.9993 15.6667 21.4162 14.2498 20.25 13.0827C19.0829 11.9164 17.666 11.3333 15.9993 11.3333C14.3327 11.3333 12.9158 11.9164 11.7487 13.0827C10.5825 14.2498 9.99935 15.6667 9.99935 17.3333C9.99935 19 10.5825 20.4169 11.7487 21.584C12.9158 22.7502 14.3327 23.3333 15.9993 23.3333ZM15.9993 20.6667C15.066 20.6667 14.2771 20.3444 13.6327 19.7C12.9882 19.0556 12.666 18.2667 12.666 17.3333C12.666 16.4 12.9882 15.6111 13.6327 14.9667C14.2771 14.3222 15.066 14 15.9993 14C16.9327 14 17.7216 14.3222 18.366 14.9667C19.0105 15.6111 19.3327 16.4 19.3327 17.3333C19.3327 18.2667 19.0105 19.0556 18.366 19.7C17.7216 20.3444 16.9327 20.6667 15.9993 20.6667ZM5.33268 28C4.59935 28 3.97179 27.7391 3.45002 27.2173C2.92735 26.6947 2.66602 26.0667 2.66602 25.3333V9.33333C2.66602 8.6 2.92735 7.97244 3.45002 7.45067C3.97179 6.928 4.59935 6.66667 5.33268 6.66667H9.53268L11.9993 4H19.9993L22.466 6.66667H26.666C27.3993 6.66667 28.0273 6.928 28.55 7.45067C29.0718 7.97244 29.3327 8.6 29.3327 9.33333V25.3333C29.3327 26.0667 29.0718 26.6947 28.55 27.2173C28.0273 27.7391 27.3993 28 26.666 28H5.33268ZM26.666 25.3333V9.33333H21.266L18.8327 6.66667H13.166L10.7327 9.33333H5.33268V25.3333H26.666Z"
                      fill="#3470E4"
                    />
                  </svg>
                </Box>
              ) : (
                <Avatar src={urlF} bg={"none"} border={"1px solid grey"} />
              )}
            </Box>
          </Box>
          <Box>
            {/* ADDHAR BACK IMAGE */}
            <FormLabel as={"h6"}>Upload the back side of your Aadhaar for verification</FormLabel>

            <Box display={"flex"} justifyContent={"space-between"} gap={3}>
              <Box
                className="drag-area"
                width={"90%"}
                border={"1px dashed grey"}
                display={"flex"}
                userSelect={"none"}
                alignItems={"center"}
                justifyContent={"center"}
                bgColor={"white"}
                borderRadius={5}
                py={"12px"}
                onDragOver={onDragOverBack}
                onDragLeave={onDragLeaveBack}
                onDrop={onDropBack}
              >
                {isDraggingBack ? (
                  <span className="select">Drag and Drop here</span>
                ) : (
                  <>
                    <span style={{ marginRight: "4px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12ZM12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"
                          fill="#87D5AE"
                        />
                      </svg>
                    </span>
                    {"  "} Drag and Drop or {""}
                    <span className="select" role="button" onClick={selectFileBack}>
                      Browse
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  className="file"
                  ref={fileInputRefBack}
                  onChange={onFileSelectBack}
                />
              </Box>
              {addharBack === "" ? (
                <Box borderRadius={"50%"} border={"1px solid grey"} p={"8px"} bgColor={"white"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M15.9993 23.3333C17.666 23.3333 19.0829 22.7502 20.25 21.584C21.4162 20.4169 21.9993 19 21.9993 17.3333C21.9993 15.6667 21.4162 14.2498 20.25 13.0827C19.0829 11.9164 17.666 11.3333 15.9993 11.3333C14.3327 11.3333 12.9158 11.9164 11.7487 13.0827C10.5825 14.2498 9.99935 15.6667 9.99935 17.3333C9.99935 19 10.5825 20.4169 11.7487 21.584C12.9158 22.7502 14.3327 23.3333 15.9993 23.3333ZM15.9993 20.6667C15.066 20.6667 14.2771 20.3444 13.6327 19.7C12.9882 19.0556 12.666 18.2667 12.666 17.3333C12.666 16.4 12.9882 15.6111 13.6327 14.9667C14.2771 14.3222 15.066 14 15.9993 14C16.9327 14 17.7216 14.3222 18.366 14.9667C19.0105 15.6111 19.3327 16.4 19.3327 17.3333C19.3327 18.2667 19.0105 19.0556 18.366 19.7C17.7216 20.3444 16.9327 20.6667 15.9993 20.6667ZM5.33268 28C4.59935 28 3.97179 27.7391 3.45002 27.2173C2.92735 26.6947 2.66602 26.0667 2.66602 25.3333V9.33333C2.66602 8.6 2.92735 7.97244 3.45002 7.45067C3.97179 6.928 4.59935 6.66667 5.33268 6.66667H9.53268L11.9993 4H19.9993L22.466 6.66667H26.666C27.3993 6.66667 28.0273 6.928 28.55 7.45067C29.0718 7.97244 29.3327 8.6 29.3327 9.33333V25.3333C29.3327 26.0667 29.0718 26.6947 28.55 27.2173C28.0273 27.7391 27.3993 28 26.666 28H5.33268ZM26.666 25.3333V9.33333H21.266L18.8327 6.66667H13.166L10.7327 9.33333H5.33268V25.3333H26.666Z"
                      fill="#3470E4"
                    />
                  </svg>
                </Box>
              ) : (
                <Avatar src={urlB} bg={"none"} border={"1px solid grey"} />
              )}
            </Box>
          </Box>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default IdVerfication;
