import React from 'react';
import { GitCompare, Info } from 'lucide-react';

interface CorrelationData {
  pair1: string;
  pair2: string;
  correlation: number; // -100 to 100
  strength: 'strong' | 'moderate' | 'weak';
}

const CorrelationMatrix: React.FC = () => {
  const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'XAUUSD'];
  
  // Simulated correlation data
  const correlations: CorrelationData[] = [
    { pair1: 'EURUSD', pair2: 'GBPUSD', correlation: 85, strength: 'strong' },
    { pair1: 'EURUSD', pair2: 'AUDUSD', correlation: 72, strength: 'strong' },
    { pair1: 'EURUSD', pair2: 'USDJPY', correlation: -68, strength: 'strong' },
    { pair1: 'GBPUSD', pair2: 'AUDUSD', correlation: 78, strength: 'strong' },
    { pair1: 'USDJPY', pair2: 'XAUUSD', correlation: -75, strength: 'strong' },
    { pair1: 'USDCAD', pair2: 'XAUUSD', correlation: -65, strength: 'strong' },
    { pair1: 'EURUSD', pair2: 'USDCAD', correlation: -45, strength: 'moderate' },
    { pair1: 'GBPUSD', pair2: 'USDJPY', correlation: -52, strength: 'moderate' },
  ];

  const getCorrelationColor = (value: number) => {
    if (value >= 70) return 'bg-emerald-500';
    if (value >= 50) return 'bg-emerald-400';
    if (value >= 30) return 'bg-emerald-300';
    if (value <= -70) return 'bg-red-500';
    if (value <= -50) return 'bg-red-400';
    if (value <= -30) return 'bg-red-300';
    return 'bg-gray-300';
  };

  const getCorrelationValue = (p1: string, p2: string): number => {
    if (p1 === p2) return 100;
    const corr = correlations.find(c => 
      (c.pair1 === p1 && c.pair2 === p2) || (c.pair1 === p2 && c.pair2 === p1)
    );
    return corr?.correlation || 0;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <GitCompare className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Correlation Matrix</h3>
            <p className="text-sm text-gray-500">Understand relationships between pairs</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2"></th>
              {pairs.map(pair => (
                <th key={pair} className="p-2 text-xs font-semibold text-gray-700">
                  {pair}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pairs.map(rowPair => (
              <tr key={rowPair}>
                <td className="p-2 text-xs font-semibold text-gray-700">{rowPair}</td>
                {pairs.map(colPair => {
                  const corr = getCorrelationValue(rowPair, colPair);
                  return (
                    <td key={`${rowPair}-${colPair}`} className="p-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white ${getCorrelationColor(corr)}`}
                        title={`${rowPair} vs ${colPair}: ${corr}%`}
                      >
                        {corr}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 mt-0.5" />
          <p className="text-sm text-gray-600">
            <strong>Positive correlation:</strong> Pairs move in the same direction. 
            Buying both increases risk exposure.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-red-500 mt-0.5" />
          <p className="text-sm text-gray-600">
            <strong>Negative correlation:</strong> Pairs move in opposite directions. 
            Can be used for hedging strategies.
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Insights:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• EURUSD & GBPUSD: Strong positive (85%) - Avoid buying both</li>
          <li>• USDJPY & XAUUSD: Strong negative (-75%) - Natural hedge</li>
          <li>• Risk reduction: Trade pairs with low correlation (&lt;30%)</li>
        </ul>
      </div>
    </div>
  );
};

export default CorrelationMatrix;
