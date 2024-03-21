import { useRef, useEffect, MutableRefObject } from "react";
import { Container, Box, Button } from "@mui/material";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { object, any, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

import { useUploadDataMutation } from "../redux/api/uploadApi";

const newChatbotSaveSchema = object({
  image: any(),
  cloth: any(),
});

export type NewChatbotSaveSchema = TypeOf<typeof newChatbotSaveSchema>;

const CreateChatbotPage = () => {
  const imageFileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const wearRef = useRef<HTMLImageElement>(null);
  const wearFileRef = useRef<HTMLInputElement>(null);
  const resRef = useRef<HTMLImageElement>(null);

  const [uploadData, uploadState] = useUploadDataMutation();
  const methods = useForm<NewChatbotSaveSchema>({
    resolver: zodResolver(newChatbotSaveSchema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (uploadState.isSuccess) {
      toast.success("Result deduced successfully!");
      console.log(uploadState.data)
      if(resRef.current)
        resRef.current.src = `https://f6b7-188-43-253-74.ngrok-free.app/static/${uploadState.data.wear}`;
    }
    if (uploadState.isError) {
      console.log(uploadState.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadState]);

  const onSubmitHandler: SubmitHandler<NewChatbotSaveSchema> = (
    values: NewChatbotSaveSchema
  ) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("cloth", values.cloth);
    uploadData(formData);
  };

  return (
    <>
      <Container sx={{ pt: 8 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormProvider {...methods}>
            <Box display="flex" gap={10}>
              <Box display="flex" flexDirection="column" gap={4} mb={2}>
                <img ref={imgRef} alt="" width={192} height={256}/>
                <Button
                  variant="contained"
                  onClick={() => {
                    imageFileRef.current?.click();
                  }}
                >
                  Choose Photo
                </Button>
                <Box
                  ref={imageFileRef}
                  component="input"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={(event) => {
                    if (event.target.files) {
                      setValue("image", event.target.files[0]);
                      const reader = new FileReader();
                      reader.onload = () => {
                        (
                          imgRef as MutableRefObject<HTMLImageElement>
                        ).current.src = reader.result as string;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    }
                  }}
                />
              </Box>

              <Box display="flex" flexDirection="column" gap={4} mb={2}>
                <img ref={wearRef} alt="" width={192} height={256}/>
                <Button
                  variant="contained"
                  onClick={() => {
                    wearFileRef.current?.click();
                  }}
                >
                  Choose Clothes
                </Button>
                <Box
                  ref={wearFileRef}
                  component="input"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={(event) => {
                    if (event.target.files) {
                      setValue("cloth", event.target.files[0]);
                      const reader = new FileReader();
                      reader.onload = () => {
                        (
                          wearRef as MutableRefObject<HTMLImageElement>
                        ).current.src = reader.result as string;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    }
                  }}
                />
              </Box>

              <LoadingButton
                sx={{ mt: 4 }}
                type="submit"
                variant="contained"
              >
                Wear
              </LoadingButton>

              <Box display="flex">
                <img ref={resRef} width={192} height={256}/>
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </>
  );
};

export default CreateChatbotPage;
