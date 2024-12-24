import { ConfirmDialog, PageTitle, Spinner } from '@common';
import { useTranslations } from '@hooks/useTranslations';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@queries';
import type { Category } from '@shared/types';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import type { ToastMessage } from 'primereact/toast';
import { useCallback, useRef, useState } from 'react';
import CategoryCard from './components/CategoryCard';
import CreateCategory from './components/CreateCategory';
import EditCategory from './components/EditCategory';

const Categories = () => {
  const { t } = useTranslations();

  const { data: categories = [], isLoading, isError, error } = useCategories();
  const toast = useRef<Toast | null>(null);

  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const { mutate: addCategory } = useCreateCategory();

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const { mutate: updateCategory } = useUpdateCategory();
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

  const { mutate: deleteCategory } = useDeleteCategory();
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const displayToast = useCallback(
    (message: string, severity?: ToastMessage['severity']) => {
      toast.current?.show({
        severity: severity,
        summary: t('common.action'),
        detail: message,
        life: 3000,
      });
    },
    [],
  );

  const handleDeleteCategory = (category: Category) => {
    if (!category) {
      return;
    }
    setSelectedCategory(category);
    setIsDeleteDialogVisible(true);
  };

  const handleConfirmDeleteCategory = (category: Category) => {
    if (!category) {
      return;
    }
    deleteCategory(category, {
      onSuccess: () => {
        displayToast(t('categories.deletedCategory'), 'success');
        setIsDeleteDialogVisible(false);
      },
      onError: () =>
        displayToast(t('categories.failedDeleteCategory'), 'error'),
    });
  };

  const handleEditCategory = (category: Category) => {
    if (!category) {
      return;
    }
    setSelectedCategory(category);
    setIsEditDialogVisible(true);
  };

  const handleUpdateCategory = (category: Category) => {
    updateCategory(category, {
      onSuccess: () => {
        displayToast(t('categories.updatedCategory'), 'success');
        setIsEditDialogVisible(false);
      },
      onError: () =>
        displayToast(t('categories.failedUpdateCategory'), 'error'),
    });
  };

  const handleCreateCategory = (newCategory: Omit<Category, 'id'>) => {
    addCategory(newCategory, {
      onSuccess: () => {
        displayToast(t('categories.createdCategory'), 'success');
        setIsCreateDialogVisible(false);
      },
      onError: () =>
        displayToast(t('categories.failedCreateCategory'), 'error'),
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <Message severity="error" text={error?.message} />;
  }

  return (
    <>
      <Toast ref={toast} />
      <PageTitle description={t('categories.description')}>
        {t('common.categories')}
      </PageTitle>
      <Button
        icon="pi pi-plus"
        label="Category"
        outlined
        className="my-4 text-teal-500 border-teal-500 dark:text-teal-400 dark:border-teal-400"
        onClick={() => setIsCreateDialogVisible(true)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category: Category) => (
            <div key={category.id}>
              <CategoryCard
                category={category}
                onDelete={handleDeleteCategory}
                onEdit={handleEditCategory}
              />
            </div>
          ))
        ) : (
          <Message
            severity="info"
            text={t('categories.notFound')}
            className="text-left text-xl"
          />
        )}
      </div>
      {selectedCategory && (
        <EditCategory
          category={selectedCategory}
          isVisible={isEditDialogVisible}
          closeDialog={() => setIsEditDialogVisible(false)}
          onUpdateCategory={handleUpdateCategory}
        />
      )}
      {selectedCategory && (
        <ConfirmDialog
          visible={isDeleteDialogVisible}
          handleHiding={() => setIsDeleteDialogVisible(false)}
          content={t('categories.confirmDelete', {
            name: selectedCategory.name,
          })}
          onConfirm={() => handleConfirmDeleteCategory(selectedCategory)}
        />
      )}
      <CreateCategory
        isVisible={isCreateDialogVisible}
        closeDialog={() => setIsCreateDialogVisible(false)}
        onCreateCategory={handleCreateCategory}
      />
    </>
  );
};

export default Categories;
