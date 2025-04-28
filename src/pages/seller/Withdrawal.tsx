import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const SWithdrawal: React.FC = () => {
  const { sellerProfile, withdrawFunds } = useAppContext();
  const [amount, setAmount] = useState('');
  const [withdrawAll, setWithdrawAll] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawalAmount = withdrawAll ? sellerProfile.balance : parseFloat(amount);
    if (withdrawalAmount && withdrawalAmount <= sellerProfile.balance) {
      withdrawFunds(withdrawalAmount);
      setAmount('');
      setWithdrawAll(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Withdrawal</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-1">Withdrawable Balance</h2>
          <p className="text-3xl font-bold text-[#3B5249]">
            Rp{sellerProfile.balance.toLocaleString('id-ID')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Withdrawal Amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setWithdrawAll(false);
                }}
                disabled={withdrawAll}
                placeholder="Minimum Rp10.000"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="withdrawAll"
                checked={withdrawAll}
                onChange={(e) => {
                  setWithdrawAll(e.target.checked);
                  if (e.target.checked) {
                    setAmount(sellerProfile.balance.toString());
                  } else {
                    setAmount('');
                  }
                }}
                className="rounded border-gray-300 text-[#3B5249] focus:ring-[#3B5249]"
              />
              <label htmlFor="withdrawAll" className="text-sm text-gray-600">
                Withdraw All
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transfer to
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-8 bg-blue-600 text-white flex items-center justify-center rounded font-bold">
                {sellerProfile.bankName}
              </div>
              <div>
                <p className="text-sm font-medium">{sellerProfile.bankAccount}</p>
                <p className="text-xs text-gray-500">{sellerProfile.name}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!amount || parseFloat(amount) < 10000 || parseFloat(amount) > sellerProfile.balance}
              className="bg-[#609966] hover:bg-[#40513B] cursor-pointer disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SWithdrawal;