import React from 'react'
import { CloseIcon, CopyIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  plugActions,
  selectPlugState,
  useAppDispatch,
  useAppSelector,
} from '../store';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { Principal } from '@dfinity/principal';
import { useCallback } from 'react';

export const plug = (window as any).ic?.plug;

const PlugAccount: React.FunctionComponent = () => {


  const requestDisconnect = () => plug?.disconnect();
  // Use states from store
  const { principal } = useAppSelector(selectPlugState);
  const dispatch = useAppDispatch();

  // Create a function to handle disconnection and app states
  const handleDisconnect = useCallback(() => {
    requestDisconnect();
    dispatch(plugActions.setPrincipal(undefined));
  }, [dispatch]);
  return (
    <>
      <Menu>
        <MenuButton
          border={'none'}
          backgroundColor={'transparent'}
        >
          <ChevronDownIcon
            fontSize={'1.5rem'}
            marginLeft={'0.5 rem'}
            display={'flex'}
            alignItems={'start'}
          />
        </MenuButton>
        <MenuList className='section'
          background={'#ffffff'}
          borderRadius={'10px'}
          px={25}
          py={10}
        >
          <MenuItem
            border={'none'}
            backgroundColor={'transparent'}
          >
            <CloseIcon mr={1} />
            <button onClick={handleDisconnect} className="click">
              Disconnect</button>
          </MenuItem>
          <MenuItem
            border={'none'}
            backgroundColor={'transparent'}
          >
            <CopyIcon mr={1} />
            <button onClick={() => {
              navigator.clipboard.writeText((principal as Principal).toString());
            }
            } className="click">
              Copy ID
            </button></MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default PlugAccount
