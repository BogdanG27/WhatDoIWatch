import { FormActionType } from "@infrastructure/utils/formActionTypes";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { StaffForm } from "@presentation/components/forms/Staff/StaffForm";
import { useIntl } from "react-intl";

export const StaffUpdateDialog = ({ isOpen, setIsOpen }: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { formatMessage } = useIntl();
    const close = () => setIsOpen(false);

    return <div>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.updateStaff" })}
            </DialogTitle>
            <DialogContent>
                <StaffForm
                    onSubmit={close}
                    action={FormActionType.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};