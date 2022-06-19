import React from 'react'
import { styled } from '@stitches/react';
import plugLight from './assets/plugLight.svg';
import plugDark from './assets/plugDark.svg';
import {
  plugActions,
  selectPlugState,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { Principal } from '@dfinity/principal';
import { useCallback } from 'react';
import PlugAccount from './plugaccount';

const Button = styled('button', {
  display: "flex",
  alignItems: "center",
  py: "0",
  border: 'none',
  background: 'linear-gradient(93.07deg, #FFD719 0.61%, #F754D4 33.98%, #1FD1EC 65.84%, #48FA6B 97.7%)',
  padding: '2px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s',

  '&:hover': {
    transform: 'scale(1.03)',
  },

  '& > div': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: 'white',
    padding: '5px 12px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
  },

  '& .dark': {
    background: '#111827',
    color: 'white',
  },

  '& img': {
    marginRight: '9px',
  },

  variants: {
    dark: {
      true: {
        '& > div': {
          background: '#111827',
          color: 'white',
        },
      }
    },
  },
});

export const DefaultButtonText = "Connect to Plug";
export const plug = (window as any).ic?.plug;

const requestConnect = () =>
  plug?.requestConnect({
    whitelist: ['ryjl3-tyaaa-aaaaa-aaaba-cai'
      , 'pndwz-4qaaa-aaaag-qakvq-cai'
      , 'pvre2-hyaaa-aaaal-qa57q-cai'
      , '55eq6-miaaa-aaaal-qa66q-cai'
      , 'psqco-kaaaa-aaaal-qa57a-cai'
    ],
  })

const getPrincipal = () => plug?.getPrincipal();

const PlugConnect = ({
  dark = false,
  title = DefaultButtonText,
}: {
  dark?: boolean,
  title?: string,

}) => {
  // Use states from store
  const { principal, isLoading } = useAppSelector(selectPlugState);
  const dispatch = useAppDispatch();

  // Create a function to handle connection and app states
  const handleConnect = useCallback(() => {
    dispatch(plugActions.setIsLoading(true));
    requestConnect()
      .then(getPrincipal)
      .then((response: Principal) =>
        dispatch(plugActions.setPrincipal(response))
      )
      .finally(() => dispatch(plugActions.setIsLoading(false)));
  }, [dispatch]);


  return (
    <Button dark={dark} >
      <div>
        <img
          src={dark ? plugDark : plugLight}
          alt="Plug logo"
        />
        {isLoading ? (
          'Loading...'

        ) : principal ? (
          <>
            {principal.toString().slice(0, 5)}...{principal.toString().slice(
              principal.toString().length - 3,
              principal.toString().length
            )}
            <PlugAccount/>
          </>
        ) : (
          <button onClick={handleConnect} className="click">
            {title}
          </button>
        )}
      </div>
    </Button>
  );
};

export default PlugConnect;