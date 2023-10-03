import { Box, Flex, Input, Button, List, ListItem, Heading, useColorMode } from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';
import { isDomainAvailable } from '../lib/resources';
import { deleteDomain, keepBestDomains, copyToClipboard, removeUnavaliable, handleAddDomain } from './helpers';

export interface ChallengeProps {
  /**
   * The maximum number of domains the user is allowed to have
   * in their cart. Invalid domains count toward this limit as well.
   */
  maxDomains: number;
}

export function Challenge(props: ChallengeProps) {
  const { maxDomains } = props;
  const [domainName, setDomainName] = useState<string>('');
  const [cart, setCart] = useState<string[]>([]);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const { colorMode, toggleColorMode } = useColorMode();

  const clearCart = () => {
    setCart([])
    alert("Cart Cleared!")
  }

  return (
    <Box p={4}>
      <Box mb={4}>
        <Box>
          <Heading as='h3' size='lg'>
            Domain Cart
          </Heading>
          <Heading as='h3' size='md'>
            Count/Max:{`${cart.length}/${maxDomains}`}
          </Heading>
        </Box>
        <Input
          value={domainName}
          onChange={(e) => setDomainName(e.target.value.toLowerCase())}
          placeholder="Enter domain name"
        />
        <Flex direction="column" mt={2}>
          <Button mb={2} color="gold" onClick={() => handleAddDomain(domainName, cart, setCart, setAvailability)}>Add Domain</Button>
          <Button mb={2} color="purple" onClick={() => removeUnavaliable(cart, availability, setCart)}>Remove Unavailable</Button>
          <Button mb={2} color="blue" onClick={() => copyToClipboard(cart.toString())}>Copy To Clipboard</Button>
          <Button mb={2} color="pink" onClick={() => keepBestDomains(cart, setCart, maxDomains)}>Keep Best Domains</Button>
          <Button mb={2} color="red" onClick={clearCart}>Clear Cart</Button>
          {cart.length === maxDomains ? <Button mb={2} color="green" onClick={() => alert("Domains Purchased!")}>Purchase Domains</Button> : <></>}
          <Button mb={2} onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </Flex>
      </Box>
      <Box>
        <List>
          {cart.map((domain) => (
            <Box>
              <ListItem key={domain} m={2}>
                {domain} - {availability[domain] ? 'Available' : 'Unavailable'}
              </ListItem>
              <Button ml={1} color="red" onClick={deleteDomain(domain, cart, setCart)}>Delete</Button>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}

