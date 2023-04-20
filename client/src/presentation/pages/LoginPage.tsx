import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box, Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AppRoute } from "routes";

const divStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const LoginPage = memo(() => {
  const { formatMessage } = useIntl()
  return (
    <Fragment>
      <Seo title="MobyLab Web App | Login" />
      <WebsiteLayout>
        <LoginForm />
        <div style={divStyles}>
          <div style={{ marginRight: ".5rem" }}>
            <Typography variant="h6">
              {formatMessage({ id: "globals.noAccountMessage" })}
            </Typography>
          </div>
          <Typography variant="h6">
            <Link to={AppRoute.Register}>
              {formatMessage({ id: "globals.register" })}
            </Link>
          </Typography>

        </div>
      </WebsiteLayout>
    </Fragment>
  );
});
