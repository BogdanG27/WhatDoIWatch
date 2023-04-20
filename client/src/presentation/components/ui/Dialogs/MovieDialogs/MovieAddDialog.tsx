import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useMovieAddDialogController } from "./MovieAddDialog.controller";
import { MovieForm } from "@presentation/components/forms/Movie/MovieForm";
import { useIntl } from "react-intl";
import { FormActionType } from "@infrastructure/utils/formActionTypes";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const MovieAddDialog = () => {
  const { open, close, isOpen } = useMovieAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addMovie" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addMovie" })}
      </DialogTitle>
      <DialogContent>
        <MovieForm
          onSubmit={close}
          action={FormActionType.ADD}
        />
      </DialogContent>
    </Dialog>
  </div>
};