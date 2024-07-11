import defaultExport, {bar, foo} from './foobarbaz';

jest.mock('./foobarbaz', () => {
  const originalModule = jest.requireActual('./foobarbaz');
  console.log("testing");

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => {return "mocked baz";}),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});