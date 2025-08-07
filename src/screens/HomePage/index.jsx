import AlbumScreen from "../AlbumScreen";
import "../../i18n";
import { useTranslation } from "react-i18next";


const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("Welcome to the Home Screen")}</h1>
      <AlbumScreen />
    </div>
  );
};

export default HomeScreen;
