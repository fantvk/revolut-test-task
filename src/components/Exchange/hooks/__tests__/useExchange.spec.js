import { Form } from 'antd';
import { renderHook, act } from '@testing-library/react-hooks';

import { useExchange } from '../useExchange';

jest.mock('warning', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Exchange component', () => {
  beforeAll(()=> {
    jest.useFakeTimers();
    fetch.mockResponse(async request => {
      if (request.url.endsWith('latest?base=USD')){
        return JSON.stringify({ rates: { EUR: 0.83, USD: 1 } });
      }

      return JSON.stringify({ rates: { EUR: 1, USD: 1.23 } });
    });
  });


  test('initial values', async () => {
    const { result } = renderHook(() => {
      const [form] = Form.useForm();

      return useExchange(form, ['USD', 'EUR']);
    });

    expect(result.current[0]).toEqual({ fromCurrency: 'USD', toCurrency: 'EUR' });
    expect(typeof result.current[1]).toBe('function');
    expect(result.current[2]).toEqual( null);
    expect(result.current[3]).toBe('USD');
    expect(result.current[4]).toBe('EUR');

    await act(async () => {});
  });

  test('currency from change', async () => {
    const { result } = renderHook(() => {
      const [form] = Form.useForm();

      return useExchange(form, ['USD', 'EUR']);
    });

    expect(result.current[2]).toEqual( null);

    await act(async () => {});

    expect(result.current[2]).toEqual({ EUR: 0.83, USD: 1 });

    await act(async () => {
      result.current[1]({ fromCurrency: 'EUR' }, result.current[0]);
    });

    expect(result.current[2]).toEqual({ EUR: 1, USD: 1.23 });
    expect(result.current[3]).toEqual('EUR');
    expect(result.current[4]).toEqual('EUR');
    expect(fetch.mock.calls.length).toBe(3);

    await act(async () => {
      jest.advanceTimersByTime(process.env.REACT_APP_RATES_REFRESH_INTERVAL * 2);
    });

    expect(fetch.mock.calls.length).toBe(5);
    expect(fetch.mock.calls[3][0].endsWith('latest?base=EUR')).toBe(true);
    expect(fetch.mock.calls[4][0].endsWith('latest?base=EUR')).toBe(true);
  });

  test('currency exchange calculation', async () => {
    const { result } = renderHook(() => {
      const [form] = Form.useForm();

      return [form, useExchange(form, ['USD', 'EUR'])];
    });

    await act(async () => {});

    expect(result.current[1][2]).toEqual({ EUR: 0.83, USD: 1 });

    await act(async () => {
      result.current[1][1]({ from: 10 }, { from: 10, fromCurrency: 'USD', toCurrency: 'EUR' });
    });

    expect(result.current[0].getFieldValue('to')).toBe(8.3);

    await act(async () => {
      result.current[1][1]({ to: 10 }, { to: 10, fromCurrency: 'USD', toCurrency: 'EUR' });
    });

    expect(result.current[0].getFieldValue('from')).toBe(12.05);
  });
});
