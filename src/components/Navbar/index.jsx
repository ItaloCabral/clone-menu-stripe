import React from 'react';

import { Container, DropDownDiv } from './styles';
import { DropDownProvider, DropdDownOptions, DropdownRoot } from 'components/Dropdown';
import { Developers, Products, Company } from "components/Content";

export const Navbar = () => {
  return (
    <DropDownProvider>
      <DropDownDiv>
        <Container>
            <ul>
              <li>
                <DropdDownOptions
                  name="Produtos"
                  content={Products}
                  backgroundHeight={286}
                />
              </li>
              <li>
                <DropdDownOptions
                  name="Desenvolvedores"
                  content={Developers}
                  backgroundHeight={167}
                />
              </li>
              <li>
                <DropdDownOptions
                  name="Empresa"
                  content={Company}
                  backgroundHeight={215}
                />
              </li>
            </ul>
        </Container>
        
        <DropdownRoot />
      </DropDownDiv>
    </DropDownProvider>
  );
}
