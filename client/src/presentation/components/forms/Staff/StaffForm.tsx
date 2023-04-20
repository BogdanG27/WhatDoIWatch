import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Stack,
  OutlinedInput,
  Select,
  MenuItem
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty, isUndefined } from "lodash";
import { GenderEnum, StaffTypeEnum } from "@infrastructure/apis/client";
import { DatePicker, LocalizationProvider, deDE } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useStaffFormController } from "./StaffForm.controller";
import { FormActionType } from "@infrastructure/utils/formActionTypes";

export const StaffForm = (props: {
  onSubmit?: () => void,
  action: FormActionType
}) => {
  const { formatMessage } = useIntl();
  const { state, actions, computed } = useStaffFormController(props.action, props.onSubmit);

  return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
    <Stack spacing={4} style={{ width: "100%" }}>
      <Grid container item direction="row" xs={12} columnSpacing={4}>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.firstName)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.name" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("firstName")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.firstName",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.firstName)}
            >
              {state.errors.firstName?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.lastName)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.lastName" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("lastName")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.lastName",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.lastName)}
            >
              {state.errors.lastName?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.birthdate)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.birthdate" />
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DatePicker
                {...actions.register("birthdate")}
                defaultValue={actions.watch("birthdate")}
                onChange={actions.selectDate}
              />
            </LocalizationProvider>
            <FormHelperText
              hidden={isUndefined(state.errors.birthdate)}
            >
              {state.errors.birthdate?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.gender)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.gender" />
            </FormLabel>
            <Select
              {...actions.register("gender")}
              value={actions.watch("gender")}
              onChange={actions.selectGender}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <span className="text-gray">
                  {formatMessage({ id: "globals.placeholders.selectInput" }, {
                    fieldName: formatMessage({
                      id: "globals.gender",
                    }),
                  })}
                </span>
              </MenuItem>
              <MenuItem value={GenderEnum.Female}>
                <FormattedMessage id="globals.female" />
              </MenuItem>
              <MenuItem value={GenderEnum.Male}>
                <FormattedMessage id="globals.male" />
              </MenuItem>
            </Select>
            <FormHelperText
              hidden={isUndefined(state.errors.gender)}
            >
              {state.errors.gender?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.type)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.type" />
            </FormLabel>
            <Select
              {...actions.register("type")}
              value={actions.watch("type")}
              onChange={actions.selectType}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <span className="text-gray">
                  {formatMessage({ id: "globals.placeholders.selectInput" }, {
                    fieldName: formatMessage({
                      id: "globals.type",
                    }),
                  })}
                </span>
              </MenuItem>
              <MenuItem value={StaffTypeEnum.Director}>
                {StaffTypeEnum.Director}
              </MenuItem>
              <MenuItem value={StaffTypeEnum.Producer}>
                {StaffTypeEnum.Producer}
              </MenuItem>
              <MenuItem value={StaffTypeEnum.Writer}>
                {StaffTypeEnum.Writer}
              </MenuItem>
            </Select>
            <FormHelperText
              hidden={isUndefined(state.errors.type)}
            >
              {state.errors.type?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item direction="row" xs={12} className="padding-top-sm">
        <Grid container item direction="column" xs={12} md={7}></Grid>
        <Grid container item direction="column" xs={5}>
          <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
            {computed.isSubmitting && <CircularProgress />}
          </Button>
        </Grid>
      </Grid>
    </Stack>
  </form>
};