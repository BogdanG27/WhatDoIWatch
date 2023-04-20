import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AppRoute } from "routes";
import { RegisterForm } from "@presentation/components/forms/Register/RegisterForm";

const divStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const RegistrationPage = memo(() => {
  const { formatMessage } = useIntl()
  return (
    <Fragment>
      <Seo title="MobyLab Web App | Registration" />
      <WebsiteLayout>
        <RegisterForm />
        <div style={divStyles}>
          <div style={{ marginRight: ".5rem" }}>
            <Typography variant="h6">
              {formatMessage({ id: "globals.alreadyAccount" })}
            </Typography>
          </div>
          <Typography variant="h6">
            <Link to={AppRoute.Login}>
              {formatMessage({ id: "globals.login" })}
            </Link>
          </Typography>

        </div>
      </WebsiteLayout>
    </Fragment>
  );
});
