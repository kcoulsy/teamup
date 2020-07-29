import configureStore from './configure';

it('should return a configured store', () => {
    // this is a pretty redundant test, just here for coverage
    const store = configureStore();
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('subscribe');
    expect(store).toHaveProperty('getState');
});
