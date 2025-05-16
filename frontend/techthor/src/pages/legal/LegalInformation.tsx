import { useTranslation } from "react-i18next";
import Layout2 from "../../components/Layout2";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LegalInformation = () => {
  const { t } = useTranslation();

  return (
    <Layout2>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card elevation={4} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("legalInformation.title")}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {t("legalInformation.section1.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("legalInformation.section1.text")}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {t("legalInformation.section2.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("legalInformation.section2.text")}
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-start">
              <Button
                component={RouterLink}
                to="/legal/legalnotice"
                variant="outlined"
                color="primary"
              >
                {t("legalInformation.link.legalnotice")}
              </Button>
              <Button
                component={RouterLink}
                to="/legal/privacypolicy"
                variant="outlined"
                color="primary"
              >
                {t("legalInformation.link.privacypolicy")}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout2>
  );
};

export default LegalInformation;
