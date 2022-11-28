import { Vortex } from 'react-loader-spinner';
import { LoaderStyled, LoaderTitle } from './Loader.styled'

export const Loader = () => {
  return (
    <LoaderStyled>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
      <LoaderTitle>Please wait ...</LoaderTitle>
    </LoaderStyled>
  );
};
