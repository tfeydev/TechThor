import { useTranslation } from "react-i18next";
import Layout2 from "../../components/Layout2";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const LegalNotice = () => {
  const { t } = useTranslation();

  return (
    <Layout2>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("LegalNotice.title")}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="body1" paragraph>
              {t("LegalNotice.ResponsiblePerson")}
              <br />
              {t("LegalNotice.Address")}
              <br />
              {t("LegalNotice.Contact")}
            </Typography>

            {t("LegalNotice.TaxIDVATNumber") && (
              <Typography variant="body1" paragraph>
                {t("LegalNotice.TaxIDVATNumber")}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Layout2>
  );
};

export default LegalNotice;
