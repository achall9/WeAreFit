describe('launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // it('should render welcome screen', async () => {
  //   await expect(element(by.id('welcome'))).toBeVisible();
  // });

  // it('should render home screen', async () => {
  //   await expect(element(by.id('home'))).toBeVisible();
  //   await expect(element(by.id('home-content'))).toBeVisible();
  // });
});

// describe('should show my events and tickets', () => {
//   it('should render my events', async () => {
//     await expect(element(by.id('my-events'))).toBeVisible();
//   });

//   it('should render my ticket', async () => {
//     await element(by.id('ticket')).tap();
//   });
// });

// describe('checkout', () => {
//   it('should render my ticket', async () => {
//     await element(by.id('checkout-button')).tap();
//     await expect(element(by.id('checkout-screen'))).toBeVisible();
//   });
// });
