import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useActorAddDialogController } from "./ActorAddDialog.controller";
import { ActorForm } from "@presentation/components/forms/Actor/ActorForm";
import { useIntl } from "react-intl";
import { useActorFormController } from "@presentation/components/forms/Actor/ActorForm.controller";
import { FormActionType } from "@infrastructure/utils/formActionTypes";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ActorAddDialog = () => {
  const { open, close, isOpen } = useActorAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addActor" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addActor" })}
      </DialogTitle>
      <DialogContent>
        <ActorForm
          onSubmit={close}
          action={FormActionType.ADD}
        />
      </DialogContent>
    </Dialog>
  </div>
};