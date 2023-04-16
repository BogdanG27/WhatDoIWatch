import { FormActionType } from "@infrastructure/utils/formActionTypes";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ActorForm } from "@presentation/components/forms/Actor/ActorForm";
import { useIntl } from "react-intl";

export const ActorUpdateDialog = ({ isOpen, setIsOpen }: {
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
                {formatMessage({ id: "labels.updateActor" })}
            </DialogTitle>
            <DialogContent>
                <ActorForm
                    onSubmit={close}
                    action={FormActionType.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};