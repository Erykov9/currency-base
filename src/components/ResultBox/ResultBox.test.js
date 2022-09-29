import ResultBox from './ResultBox';
import { getByTestId, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('Should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100}/>)
  });

  const testCasesPLN =  [
    {id: 'PLN 100.00 = $28.57', pln: 100},
    {id: 'PLN 320.00 = $91.43', pln: 320},
    {id: 'PLN 120.12 = $34.32', pln: 120.12},
    {id: 'PLN 2.00 = $0.57', pln: 2}
  ];

  const testCasesUSD = [
    { id: '$28.57 = PLN 100.00', usd: 28.57 },
    { id: '$12.00 = PLN 42.00', usd: 12 },
    { id: '$44.00 = PLN 154.00', usd: 44 },
    { id: '$100.00 = PLN 350.00', usd: 100 },
  ];

  const testCasesEqual = [
    { id: 100, result: 'PLN 100.00 = PLN 100.00'},
    { id: 1234, result: 'PLN 1,234.00 = PLN 1,234.00' },
    { id: 34, result: 'PLN 34.00 = PLN 34.00' },
    { id: 1.23, result: 'PLN 1.23 = PLN 1.23' }
  ];

  for (const caseObj  of testCasesEqual) {
    it('Should show the same amount', () => {
    render(<ResultBox from="PLN" to="PLN" amount={caseObj.id} />)

    const output = screen.getByTestId('mainDiv');
    

    expect(output).toHaveTextContent(caseObj.result);
   });
  };

  for (const caseObj of testCasesUSD) {
    it('Should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={caseObj.usd} />);

      const output = screen.getByTestId('mainDiv');

      expect(output).toHaveTextContent(caseObj.id);
    });
  };

  for (const caseObj of testCasesPLN) {
    it('Should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={caseObj.pln}/>);
      
      const output = screen.getByTestId('mainDiv');
  
      expect(output).toHaveTextContent(caseObj.id);
    });
  };

  it('Should return Wrong value...', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100}/>)

    const output = screen.getByTestId('mainDiv');

    expect(output).toHaveTextContent('Wrong value...');
  });
});
