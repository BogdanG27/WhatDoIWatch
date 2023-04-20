import { FormActionType } from "@infrastructure/utils/formActionTypes";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { MovieForm } from "@presentation/components/forms/Movie/MovieForm";
import { useIntl } from "react-intl";

export const MovieUpdateDialog = ({ isOpen, setIsOpen }: {
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
                {formatMessage({ id: "labels.updateMovie" })}
            </DialogTitle>
            <DialogContent>
                <MovieForm
                    onSubmit={close}
                    action={FormActionType.UPDATE}
                />
            </DialogContent>
        </Dialog>
    </div>
};