import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';

export const ExpenseFormModal = ({ isOpen, onClose }) => {
  const { categories, createExpense } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!amount || isNaN(amount) || Number(amount) <= 0) errs.amount = 'Valid positive amount is required';
    if (!categoryId) errs.categoryId = 'Category selection is required';
    if (!expenseDate) errs.expenseDate = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createExpense({
        title: title.trim(),
        amount: parseFloat(amount),
        categoryId: Number(categoryId),
        expenseDate,
        description: description.trim() || undefined,
      });

      // Reset form
      setTitle('');
      setAmount('');
      setCategoryId('');
      setDescription('');
      onClose();
    } catch (err) {
      // Error handled by Toast in AppContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Expense"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Save Expense
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Expense Title"
          name="title"
          placeholder="e.g. Grocery Shopping, AWS Server Bill"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Amount (₹)"
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
            required
          />

          <Select
            label="Category"
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categoryOptions}
            placeholder="Select Category..."
            error={errors.categoryId}
            required
          />
        </div>

        <Input
          label="Expense Date"
          name="expenseDate"
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          error={errors.expenseDate}
          required
        />

        <div className="form-group">
          <label className="form-label" htmlFor="expense-desc">Description (Optional)</label>
          <textarea
            id="expense-desc"
            className="textarea-control"
            rows="3"
            placeholder="Add any extra notes or transaction details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseFormModal;
