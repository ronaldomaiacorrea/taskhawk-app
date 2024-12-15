import { useTranslations } from '@hooks/useTranslations';
import type { Category } from '@shared/types';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import ActionButtons from 'src/common/ActionButtons';
import { useCategoryFormValidation } from '../validations/useCategoryFormValidations';
import CategoryFormFields from './CategoryFormFields';

export interface EditCategoryProps {
  category: Category;
  isVisible: boolean;
  closeDialog: () => void;
  onUpdateCategory: (category: Category) => void;
}

const EditCategory = ({
  category,
  isVisible,
  closeDialog,
  onUpdateCategory,
}: EditCategoryProps) => {
  const { t } = useTranslations();
  const categoryValidationSchema = useCategoryFormValidation();

  return (
    <Formik
      initialValues={category}
      values={category}
      onSubmit={(values) => onUpdateCategory({ ...values, id: category.id })}
      validationSchema={categoryValidationSchema}
      enableReinitialize
    >
      {({ submitForm, resetForm }) => (
        <Dialog
          header={t('categories.editCategory', { name: category.name })}
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

export default EditCategory;
