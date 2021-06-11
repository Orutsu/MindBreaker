import React, { ReactElement, useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';

import { Ionicons, Entypo, MaterialCommunityIcons   } from '@expo/vector-icons'
import { AllRoutes, RootRoutes } from '../../navigation/routes';
import styles from './styles';
import navigationService from '../../navigation/navigationService';
import { COLORS, positionHelpers } from '../../styles';

type TabBarItem = {
  icon: any | null;
  iconActive: any | null;
  route: RootRoutes;
  activeRoutes: AllRoutes[];
};

const TAB_BAR_ICON_SIZE = 30;

const tabBarItems: TabBarItem[] = [
    {
    icon: <MaterialCommunityIcons name="target-variant" size={TAB_BAR_ICON_SIZE} color="grey" />,
    iconActive: <MaterialCommunityIcons name="target-variant" size={TAB_BAR_ICON_SIZE} color="green" />,
    route: 'Goal',
    activeRoutes: ['Goal','Main_Goal'],
  },
  {
    icon: <Entypo name="flow-tree" size={TAB_BAR_ICON_SIZE} color="grey" />,
    iconActive: <Entypo name="flow-tree" size={TAB_BAR_ICON_SIZE} color="green" />,
    route: 'Tree',
    activeRoutes: [
      'Tree',
      'Main_Tree',
    ],
  },
  {
    icon: <MaterialCommunityIcons name="archive-outline" size={TAB_BAR_ICON_SIZE} color="grey" />,
    iconActive: <MaterialCommunityIcons name="archive-outline" size={TAB_BAR_ICON_SIZE} color="green" />,
    route: 'Archive',
    activeRoutes: ['Archive', 'Main_Archive'],
  },
];

const HomeTabBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const activeRouteName = navigationService.getActiveRouteNameWithDefaultRoute(
    'Main_Tree',
  );

  if (!isVisible) {
    return null;
  }

  // console.log('activeRouteName', activeRouteName);

  return (
    <SafeAreaView>
      <View style={[positionHelpers.rowFill, styles.tabbar]}>
        {tabBarItems.map((item, index) => {
          const isActive = item.activeRoutes.includes(
            activeRouteName as AllRoutes,
          );
          const ItemIcon = isActive ? item.iconActive : item.icon;

          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => navigationService.navigate(item.route)}>
              <View style={styles.optionContainer}>
                {ItemIcon}
                <Text
                  style={[
                    styles.optionsText,
                    isActive
                      ? { color: COLORS.GREEN }
                      : { color: COLORS.GREY },
                  ]}>
                  {item.route}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomeTabBar;