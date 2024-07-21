import React, { useState } from 'react';
import styles from './ExpenseTrackerForm.module.css';


const ExpenseTrackerForm: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [description, setDescription] = useState('');
    const [receiver, setReceiver] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ amount, date, type, category, paymentMethod, description, receiver });
    };

    return (
        <div className={`max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md ${styles.expenseTracker}`}>
            <h2 className="text-3xl font-semibold mb-6 text-white">Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white">Transaction Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Transaction Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Transaction Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="transfer">Transfer</option>
                        <option value="refund">Refund</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Payment Method</label>
                    <input
                        type="text"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Description/Notes</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        rows={3}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Receiver/Payer Name</label>
                    <input
                        type="text"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => {
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseTrackerForm;
