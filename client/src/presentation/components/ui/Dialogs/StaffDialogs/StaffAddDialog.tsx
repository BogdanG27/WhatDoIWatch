import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useStaffAddDialogController } from "./StaffAddDialog.controller";
import { StaffForm } from "@presentation/components/forms/Staff/StaffForm";
import { useIntl } from "react-intl";
import { FormActionType } from "@infrastructure/utils/formActionTypes";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const StaffAddDialog = () => {
  const { open, close, isOpen } = useStaffAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addStaff" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addStaff" })}
      </DialogTitle>
      <DialogContent>
        <StaffForm
          onSubmit={close}
          action={FormActionType.ADD}
        />
      </DialogContent>
    </Dialog>
  </div>
};