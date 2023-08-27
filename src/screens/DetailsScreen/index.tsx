import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, Image, ScrollView, VStack} from 'native-base';
import React from 'react';
import {RootStackParamList} from 'navigation';
import {Dimensions} from 'react-native';
import {SharedElement} from 'react-native-shared-element';
import Label from 'components/Label';
import {getDetailSharedElements} from 'screens/getDetailSharedElements';

const DetailsScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'DetailsScreen'>>();
  const {height} = Dimensions.get('window');
  const ITEM_HEIGHT = height * 0.5;

  return (
    <Box bgColor={'black'}>
      <SharedElement id={`item.${params.data.id}.image_url`}>
        <Image
          source={{uri: params.data.image_url}}
          w={'100%'}
          h={ITEM_HEIGHT}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
          resizeMethod="auto"
          alt={'banner'}
        />
      </SharedElement>
      <VStack mt={5}>
        <VStack ml={5}>
          {/* <SharedElement id={`item.${params.data.id}.title`}> */}
          <Label sz={'3xlarge'} color={'white'}>
            {params.data.title}
          </Label>
          {/* </SharedElement> */}
          {/* <SharedElement id={`item.${params.data.id}.description`}> */}
          <Label sz={'large'} color={'white'}>
            {params.data.description}
          </Label>
          {/* </SharedElement> */}
        </VStack>
      </VStack>
      <ScrollView paddingLeft={5} paddingRight={5}>
        <Label sz={'medium'} color={'white'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Label>
        <Label sz={'medium'} color={'white'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Label>
      </ScrollView>
    </Box>
  );
};

DetailsScreen.sharedElements = getDetailSharedElements;

export default DetailsScreen;
