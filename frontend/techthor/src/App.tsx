import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Mathematics from "./pages/tech/Mathematics";
import ML from "./pages/tech/ML";
import DL from "./pages/tech/DL";
import AI from "./pages/tech/AI";
import DataFusionHUB from "./pages/dashboard/DataFusionHUB";
import Tech from "./pages/tech/Tech";
import DataSourceManager from "./pages/dashboard/DataSourceManager";
import DataSourceCustomizing from "./pages/dashboard/DataSourceCustomizing";
import AnalyticHUB from "./pages/dashboard/AnalyticsHUB";
import LegalInformation from "./pages/legal/LegalInformation";
import LegalNotice from "./pages/legal/LegalNotice";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import About from "./pages/About";
import DataPreviewPage from "./pages/dashboard/SourceDialog/DataPreviewDialog";
import './i18n.ts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tech/" element={<Tech />} />
        <Route path="/tech/mathematik" element={<Mathematics />} />
        <Route path="/tech/ml" element={<ML />} />
        <Route path="/tech/dl" element={<DL />} />
        <Route path="/tech/ai" element={<AI />} />
        <Route path="/dashboard/datafusionhub" element={<DataFusionHUB />} />
        <Route path="/dashboard/datafusionhub/data-source-manager" element={<DataSourceManager />} />
        <Route path="/dashboard/datafusionhub/data-source-customizing" element={<DataSourceCustomizing />} />
        <Route path="/dashboard/datafusionhub/analytics-hub" element={<AnalyticHUB />} />
        <Route path="/data-preview/:name" element={<DataPreviewPage />} />
        <Route path="/dashboard/datafusionhub/data-source-manager" element={<DataSourceManager />} />
        <Route path="/dashboard/datafusionhub/data-source-customizing" element={<DataSourceCustomizing />} />
        <Route path="/legal/information" element={<LegalInformation />} />
        <Route path="/legal/notice" element={<LegalNotice />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />

      </Routes>
    </Router>
  );
}

export default App;
