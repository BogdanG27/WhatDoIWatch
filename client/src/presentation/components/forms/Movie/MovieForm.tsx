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
import { DatePicker, LocalizationProvider, deDE } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMovieFormController } from "./MovieForm.controller";
import { FormActionType } from "@infrastructure/utils/formActionTypes";
import { GenderEnum } from "@infrastructure/apis/client";

export const MovieForm = (props: {
  onSubmit?: () => void,
  action: FormActionType
}) => {
  const { formatMessage } = useIntl();
  const { state, actions, computed } = useMovieFormController(props.action, props.onSubmit);

  return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
    <Stack spacing={4} style={{ width: "100%" }}>
      <Grid container item direction="row" xs={12} columnSpacing={4}>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.name)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.name" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("name")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.name",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.name)}
            >
              {state.errors.name?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.description)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.description" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("description")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.description",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.description)}
            >
              {state.errors.description?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.releaseDate)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.releaseDate" />
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DatePicker
                {...actions.register("releaseDate")}
                defaultValue={actions.watch("releaseDate")}
                onChange={actions.selectDate}
              />
            </LocalizationProvider>
            <FormHelperText
              hidden={isUndefined(state.errors.releaseDate)}
            >
              {state.errors.releaseDate?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.language)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.language" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("language")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.language",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.language)}
            >
              {state.errors.language?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.genre)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.genre" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("genre")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.genre",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.genre)}
            >
              {state.errors.genre?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.imageUrl)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.imageUrl" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("imageUrl")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.imageUrl",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.imageUrl)}
            >
              {state.errors.imageUrl?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.rating)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.rating" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("rating")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.rating",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.rating)}
            >
              {state.errors.rating?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.numberOfRatings)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.numberOfRatings" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("numberOfRatings")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.numberOfRatings",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.numberOfRatings)}
            >
              {state.errors.numberOfRatings?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="column" xs={6} md={6}>
          <FormControl
            fullWidth
            error={!isUndefined(state.errors.duration)}
          >
            <FormLabel required>
              <FormattedMessage id="globals.duration" />
            </FormLabel>
            <OutlinedInput
              {...actions.register("duration")}
              placeholder={formatMessage(
                { id: "globals.placeholders.textInput" },
                {
                  fieldName: formatMessage({
                    id: "globals.duration",
                  }),
                })}
              autoComplete="none"
            />
            <FormHelperText
              hidden={isUndefined(state.errors.duration)}
            >
              {state.errors.duration?.message}
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