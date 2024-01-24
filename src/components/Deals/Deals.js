import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Box, TextField, Grid, Paper, Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { ADD_DEAL } from "../../gql/mutation";

const Deals = ({ _id, dealDescription, setOpenAdd, setDisplayDeals }) => {
  const descriptionRef = useRef();
  const [addDeal] = useMutation(ADD_DEAL);

  const handleClick = () => {
    const descriptionValue = descriptionRef.current?.value;

    if (Array.isArray(dealDescription) && descriptionValue) {
      addDeal({
        variables: {
          _id,
          deals: [...dealDescription, { description: descriptionValue }],
        },
      });
      setDisplayDeals((oldList) => [...oldList, { description: descriptionValue }]);
      if (typeof setOpenAdd === "function") {
        setOpenAdd(false);
      }
    }
  };

  const handleClose = () => {
    if (typeof setOpenAdd === "function") {
      setOpenAdd(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={6} sx={{ padding: "2rem" }}>
        <Stack spacing={2}>
          <Grid container sx={{ marginTop: "1rem" }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                inputRef={descriptionRef}
              />
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={{ width: "25%" }}
              onClick={handleClick}
              color="success"
            >
              Save
            </LoadingButton>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "25%" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Deals;
