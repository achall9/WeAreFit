import {useNavigation} from '@react-navigation/native';
import {Box, Stack, ScrollView, Image, Pressable, Text, View, ZStack, VStack, HStack} from 'native-base';
import React from 'react';
import {data} from 'config';
import Label from 'components/Label';
import {SharedElement} from 'react-navigation-shared-element';
import {Dimensions} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Welcome = () => {
  const {width} = Dimensions.get('screen');

  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

  const {navigate} = useNavigation();

  const onPressDetails = (item: {
    id: string;
    image_url: string;
    iconName: string;
    title: string;
    description: string;
  }) => {
    navigate('DetailsScreen', {data: item});
  };

  const renderSection = (item: {
    id: string;
    image_url: string;
    iconName: string;
    title: string;
    description: string;
  }) => {
    return (
      <Box key={item.id} m={2}>
        <Pressable
          mb={1}
          opacity={0.8}
          onPress={() => {
            onPressDetails(item);
          }}>
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              rounded="lg"
              w={ITEM_WIDTH}
              h={ITEM_HEIGHT}
              source={{uri: item.image_url}}
              alt="image"
              resizeMethod="auto"
            />
          </SharedElement>

          <Box position={'absolute'} bottom={5} left={2}>
            <HStack>
              <SharedElement id={`item.${item.id}.iconName`}>
                <SimpleLineIcons size={40} color="white" name={item.iconName} />
              </SharedElement>
              <VStack paddingLeft={2}>
                <SharedElement id={`item.${item.id}.title`}>
                  <Label sz={'3xlarge'} color={'white'}>
                    {item.title}
                  </Label>
                </SharedElement>
                <SharedElement id={`item.${item.id}.description`}>
                  <Label sz={'large'} color={'white'}>
                    {item.description}
                  </Label>
                </SharedElement>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  return (
    <Stack>
      <Stack mt={10} mb={2} paddingLeft={5}>
        <Label sz="large" color="black">
          Saturday 9 January
        </Label>
        <Label mt="1" sz="3xlarge" color="black">
          Today
        </Label>
      </Stack>
      <ScrollView>
        <VStack>{data.map((item: any) => renderSection(item))}</VStack>
      </ScrollView>
    </Stack>
  );
};

export default Welcome;
