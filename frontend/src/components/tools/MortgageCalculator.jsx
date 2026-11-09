import React, { useState, useEffect, useCallback } from 'react';

const MortgageCalculator = () => {
  const [price, setPrice] = useState(1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [breakdown, setBreakdown] = useState({ principalInterest: 0, tax: 0, insurance: 0 });

  const calculateMortgage = useCallback(() => {
    const downPayment = price * (downPaymentPercent / 100);
    const principal = price - downPayment;
    
    // Monthly Interest Rate
    const r = interestRate / 100 / 12;
    // Number of Payments
    const n = loanTerm * 12;
    
    // Monthly Principal & Interest
    let pi = 0;
    if (r === 0) {
      pi = principal / n;
    } else {
      pi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    // Monthly Property Tax (~1.2% annually)
    const tax = (price * 0.012) / 12;
    // Monthly Insurance (~0.4% annually)
    const insurance = (price * 0.004) / 12;

    setBreakdown({
      principalInterest: pi,
      tax,
      insurance
    });
    setMonthlyPayment(pi + tax + insurance);
  }, [price, downPaymentPercent, interestRate, loanTerm]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // SVG Donut Chart Logic
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  const getOffset = (value) => {
    return circumference - (value / monthlyPayment) * circumference;
  };

  const piDasharray = `${circumference - getOffset(breakdown.principalInterest)} ${circumference}`;
  const taxDasharray = `${circumference - getOffset(breakdown.tax)} ${circumference}`;
  const taxOffset = - (circumference - getOffset(breakdown.principalInterest));
  const insDasharray = `${circumference - getOffset(breakdown.insurance)} ${circumference}`;
  const insOffset = taxOffset - (circumference - getOffset(breakdown.tax));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-serif text-[#C8A45E] mb-8">Mortgage Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Property Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-8 pr-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-400">Down Payment</label>
              <span className="text-[#C8A45E] font-medium">{downPaymentPercent}% ({formatCurrency(price * (downPaymentPercent/100))})</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#C8A45E]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-400">Interest Rate</label>
              <span className="text-[#C8A45E] font-medium">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#C8A45E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Loan Term</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
            >
              <option value={15}>15 Years fixed</option>
              <option value={20}>20 Years fixed</option>
              <option value={25}>25 Years fixed</option>
              <option value={30}>30 Years fixed</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 flex flex-col items-center justify-center relative">
          <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Estimated Monthly Payment</h3>
          <div className="text-4xl md:text-5xl font-serif text-[#C8A45E] mb-8">
            {formatCurrency(monthlyPayment)}
          </div>

          {/* Donut Chart */}
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
              {/* Background Track */}
              <circle cx="96" cy="96" r={radius} fill="transparent" stroke="#1f2937" strokeWidth="24" />
              {/* Principal & Interest */}
              <circle cx="96" cy="96" r={radius} fill="transparent" stroke="#C8A45E" strokeWidth="24"
                strokeDasharray={piDasharray} strokeLinecap="round" className="transition-all duration-500" />
              {/* Property Tax */}
              <circle cx="96" cy="96" r={radius} fill="transparent" stroke="#8c7342" strokeWidth="24"
                strokeDasharray={taxDasharray} strokeDashoffset={taxOffset} strokeLinecap="round" className="transition-all duration-500" />
              {/* Insurance */}
              <circle cx="96" cy="96" r={radius} fill="transparent" stroke="#524325" strokeWidth="24"
                strokeDasharray={insDasharray} strokeDashoffset={insOffset} strokeLinecap="round" className="transition-all duration-500" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-gray-500 text-xs uppercase font-medium tracking-widest">Total</span>
            </div>
          </div>

          {/* Breakdown Legend */}
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-3 h-3 rounded-full bg-[#C8A45E]"></span> Principal & Interest
              </div>
              <span className="font-medium text-gray-100">{formatCurrency(breakdown.principalInterest)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-3 h-3 rounded-full bg-[#8c7342]"></span> Property Tax
              </div>
              <span className="font-medium text-gray-100">{formatCurrency(breakdown.tax)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-3 h-3 rounded-full bg-[#524325]"></span> Home Insurance
              </div>
              <span className="font-medium text-gray-100">{formatCurrency(breakdown.insurance)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
