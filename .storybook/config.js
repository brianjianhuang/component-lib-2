import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import Provider from '../src/Provider'

const ProviderDecorator = (storyFn) => (
  <Provider>
    { storyFn() }
  </Provider>
)

addDecorator(ProviderDecorator)

function loadStories() {
  require('../stories');
  require('../stories/4-board-story');
}


configure(loadStories, module);
