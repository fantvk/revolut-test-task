import { HISTORY_TYPE_COST, HISTORY_TYPE_REVENUE } from 'constants/history';

import reducer, { createEntity, slice } from '../history';

jest.mock('lodash/fp', () => ({
  uniqueId: () => 3,
}));

describe('history reducer actions', () => {
  test('createEntity', () => {
    expect(createEntity({ currency: 'EUR', amount: 10, title: 'Title', balance: 0 })).toEqual({
      type: `${slice.name}/createEntity`,
      payload: { currency: 'EUR', amount: 10, title: 'Title', balance: 0 },
    });
  });
});

describe('history reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      entities: [],
    });
  });

  it('should handle createEntity', () => {
    expect(reducer(undefined, createEntity({
      id: 1,
      type: HISTORY_TYPE_COST,
      timestamp: 1584183448921,
      currency: 'EUR',
      amount: 10,
      title: 'Title',
      balance: 0,
    }))).toEqual({ entities: [{
      id: 1,
      type: HISTORY_TYPE_COST,
      timestamp: 1584183448921,
      currency: 'EUR',
      amount: 10,
      title: 'Title',
      balance: 0,
    }] });
  });

  it('shouldn\'t mutate array after createEntity', () => {
    const state = {
      entities: [{
        id: 1,
        type: HISTORY_TYPE_COST,
        timestamp: 1584183448921,
        currency: 'EUR',
        amount: 10,
        title: 'Title',
        balance: 0,
      }]
    };

    const result = reducer(state, createEntity({
      id: 2,
      type: HISTORY_TYPE_COST,
      timestamp: 1584183448921,
      currency: 'EUR',
      amount: 10,
      title: 'Title',
      balance: 10,
    }));

    expect(result.entities.length).toEqual(2);
    expect(result.entities).not.toBe(state.entities);
  });

  it('createEntity should set default values', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1584183448921);

    expect(reducer(undefined, createEntity({
      currency: 'EUR',
      amount: 10,
      title: 'Title',
      balance: 0,
    }))).toEqual({ entities: [{
      id: 3,
      type: HISTORY_TYPE_REVENUE,
      timestamp: 1584183448921,
      currency: 'EUR',
      amount: 10,
      title: 'Title',
      balance: 0,
    }] });
  });
});