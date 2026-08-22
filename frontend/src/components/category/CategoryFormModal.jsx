import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';

export const CategoryFormModal = ({ isOpen, onClose }) => {
  const { createCategory } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Category name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createCategory({
        name: name.trim(),
        description: description.trim() || undefined,
      });

      setName('');
      setDescription('');
      onClose();
    } catch (err) {
      // Toast handles error display
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Dynamic Category"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Save Category
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Category Name"
          name="name"
          placeholder="e.g. Travel, Cloud Hosting, Subscriptions"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />

        <div className="form-group">
          <label className="form-label" htmlFor="cat-desc">Description (Optional)</label>
          <textarea
            id="cat-desc"
            className="textarea-control"
            rows="3"
            placeholder="Describe what expenses belong in this category..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
