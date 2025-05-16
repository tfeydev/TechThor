import { useTranslation } from "react-i18next";
import Layout2 from "../../components/Layout2";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Layout2>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("PrivacyPolicy.title")}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box
              sx={{
                "& h2": {
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  mt: 2,
                  mb: 2,
                },
                "& h3": {
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  mt: 3,
                  mb: 1.5,
                },
                "& p": {
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  mb: 2,
                },
                "& a": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
              dangerouslySetInnerHTML={{ __html: t("PrivacyPolicy.text") }}
            />

          </CardContent>
        </Card>
      </Container>
    </Layout2>
  );
};

export default PrivacyPolicy;
