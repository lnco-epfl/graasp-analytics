import DataProvider from './DataProvider';
import ViewDataProvider from './ViewDataProvider';

const ContextsWrapper = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
  <ViewDataProvider>
    <DataProvider>{children}</DataProvider>
  </ViewDataProvider>
);

export default ContextsWrapper;
