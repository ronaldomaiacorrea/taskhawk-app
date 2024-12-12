import { Form, Formik } from "formik";
import { Dialog } from "primereact/dialog";
import ActionButtons from "src/common/ActionButtons";
import { useTranslations } from "@hooks/useTranslations";
import { ICON } from "@shared/types";
import type { Category } from "@shared/types";
import CategoryFormFields from "./CategoryFormFields";
import { categoryValidationSchema } from "../validations/categoryFormValidations";


export interface CreateCategoryProps {
  isVisible: boolean;
  closeDialog: () => void;
  onCreateCategory: (category: Omit<Category, "id">) => void;
}

const initialCategory: Omit<Category, "id"> = {
  name: "",
  description: "",
  icon: ICON.QuestionCircle,
};

const CreateCategory = ({
  isVisible,
  closeDialog,
  onCreateCategory,
}: CreateCategoryProps) => {
  const { t } = useTranslations();

  return (
    <Formik
      initialValues={initialCategory}
      onSubmit={(values, { resetForm }) => {
        onCreateCategory(values);
        resetForm();
      }}
      validationSchema={categoryValidationSchema}
    >
      {({ submitForm, resetForm }) => (
        <Dialog
          header={t("categories.addCategory")}
          visible={isVisible}
          className="max-w-3xl w-full mx-auto px-4"
          onHide={() => {
            resetForm();
            closeDialog();
          }}
          footer={
            <ActionButtons
              handleSubmit={submitForm}
              handleCloseDialog={closeDialog}
              handleResetForm={resetForm}
            />
          }
        >
          <Form>
            <CategoryFormFields />
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default CreateCategory;
