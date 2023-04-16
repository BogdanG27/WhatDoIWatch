import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";

export const LoginPage = memo(() => {
  return (
    <Fragment>
      <Seo title="MobyLab Web App | Login" />
      <WebsiteLayout>
        <LoginForm />
      </WebsiteLayout>
    </Fragment>
  );
});
