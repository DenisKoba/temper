import * as api from '../index';

// @ts-expect-error: global
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('get function', () => {
  beforeEach(() => {
    // @ts-expect-error: global
    fetch.mockClear();
  });

  it('should call fetch with correct URL', async () => {
    const url = '/test';
    await api.get(url);
    expect(fetch).toHaveBeenCalledWith(`${location.origin}${url}`);
  });

  it('should call fetch with custom endpoint if provided', async () => {
    const url = '/test';
    const customEndpoint = 'http://example.com';
    await api.get(url, undefined, customEndpoint);
    expect(fetch).toHaveBeenCalledWith(`${customEndpoint}${url}`);
  });

  it('should call mapSuccessResponseData on successful response', async () => {
    jest.spyOn(api, 'mapSuccessResponseData');
    const url = '/test';
    await api.get(url);
    expect(api.mapSuccessResponseData).toHaveBeenCalled();
  });

  it('should log error on catch', async () => {
    const url = '/test';
    const consoleSpy = jest.spyOn(console, 'log');
    // @ts-expect-error: global
    fetch.mockImplementationOnce(() => Promise.reject('Error'));
    await api.get(url);
    expect(consoleSpy).toHaveBeenCalledWith('Error');
    consoleSpy.mockRestore();
  });
});
