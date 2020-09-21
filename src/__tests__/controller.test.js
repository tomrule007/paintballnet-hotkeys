import Controller from '../controller';

describe('Controller', () => {
  let appController;
  let mockView;
  let mockModel;
  beforeEach(() => {
    mockView = { bindEvent: jest.fn(), render: jest.fn() };
    mockModel = { hotkeys: { hotkey: 'command' } };
    appController = new Controller(mockView, mockModel);
  });
  describe('construction', () => {
    describe('binding event listeners', () => {
      const eventsToCall = [['onKeydown'], ['onSaveChanges'], ['onMessage']];

      it.each(eventsToCall)('binds: %p event', (event) => {
        console.log({ event });
        expect(mockView.bindEvent).toBeCalledWith(event, expect.any(Function));
      });
      it(`Calls view.bindEvent the correct amount of times`, () => {
        expect(mockView.bindEvent).toBeCalledTimes(eventsToCall.length);
      });
    });
    describe('render initial view', () => {
      it('show call render 3 times: hotkey, blank hotkey and hud message', () => {
        expect(mockView.render.mock.calls).toEqual([
          ['addHotkey', { command: 'command', hotkey: 'hotkey' }],
          ['addHotkey'],
          ['hudMessage', { text: 'PBN-Mod v1.0.0' }],
        ]);
      });
    });
  });
  describe('event handlers', () => {});
});
