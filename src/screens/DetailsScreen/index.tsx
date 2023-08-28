import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Box, Image, ScrollView, VStack, Pressable, Icon} from 'native-base';
import React, {useRef} from 'react';
import {RootStackParamList} from 'navigation';
import {Dimensions} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Label from 'components/Label';
import {getDetailSharedElements} from 'screens/getDetailSharedElements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'DetailsScreen'>>();
  const {height} = Dimensions.get('window');
  const ITEM_HEIGHT = height * 0.5;
  const buttonRef = useRef();
  const {goBack} = useNavigation();

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
      <Pressable
        position={'absolute'}
        marginTop={10}
        marginLeft={2}
        onPress={() => {
          goBack();
        }}
        hitSlop={8}>
        <MaterialCommunityIcons name="close" color="white" size={20} />
      </Pressable>
      <VStack mt={5}>
        <VStack ml={5}>
          <SharedElement id={`item.${params.data.id}.title`}>
            <Label sz={'3xlarge'} color={'white'}>
              {params.data.title}
            </Label>
          </SharedElement>
          <SharedElement id={`item.${params.data.id}.description`}>
            <Label sz={'large'} color={'white'}>
              {params.data.description}
            </Label>
          </SharedElement>
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
