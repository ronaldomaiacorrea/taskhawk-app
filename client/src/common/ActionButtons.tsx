import { useTranslations } from "@hooks/useTranslations";
import { Button } from "primereact/button";

export interface ActionButtonsProps {
  handleCloseDialog: () => void;
  handleSubmit: () => void;
  handleResetForm: () => void;
}

const ActionButtons = ({
  handleCloseDialog,
  handleSubmit,
  handleResetForm,
}: ActionButtonsProps) => {
  const { t } = useTranslations();
  return (
    <>
      <Button
        label={t("common.cancel")}
        className="p-button-text"
        onClick={() => {
          handleCloseDialog();
          handleResetForm();
        }}
        text
        severity="secondary"
      />
      <Button
        label={t("common.save")}
        className="p-button-primary"
        onClick={handleSubmit}
      />
    </>
  );
};

export default ActionButtons;
