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
  describe('event handlers', () => {
    describe('handleMessage', () => {
      const messageAndExecptedResponse = [
        [
          'You splatted a kamikazi bot in the circuitry!',
          'a kamikazi bot (circuitry!)',
        ],
      ];

      // case to add:  ${'+$85'} | ${'  You earned $85 for being on the winning team!'}
      it.each`
        expected                         | given
        ${'a kamikazi bot (circuitry!)'} | ${'You splatted a kamikazi bot in the circuitry!'}
        ${'+$5 (token)'}                 | ${'You sell the token for $5.'}
        ${'+$10'}                        | ${'  You earned $10 for surviving!'}
        ${'3 Bots'}                      | ${'Bot Roster:\r\na smart bot\r\na dumb bot\r\na gun bot'}
        ${'+$2'}                         | ${'You are given an instant $2!'}
        ${'a gun bot splatted you!'}     | ${'a cyan paintball (a gun bot) splatted you in the BODY!'}
      `('$expected <-- $given', ({ given, expected }) => {
        const msgEvent = {
          data: JSON.stringify({
            id: '10',
            text: given,
          }),
        };
        appController.handleMessage(msgEvent);
        expect(mockView.render).toHaveBeenLastCalledWith(
          'hudMessage',
          expect.objectContaining({
            text: expected,
          })
        );
      });
    });
  });
});
