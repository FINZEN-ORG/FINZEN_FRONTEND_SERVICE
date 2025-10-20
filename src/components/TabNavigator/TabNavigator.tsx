import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { tabStyles } from './TabNavigator.Style';

import Dashboard from '../../screens/dashboard/Dashboard';
import GoalsScreen from '../../screens/goals/GoalsScreen';
import AICoachScreen from '../../screens/coach/AICoachScreen';
import BudgetScreen from '../../screens/budget/BudgetScreen';
import ReportsScreen from '../../screens/reports/ReportsScreen';

export type TabNavigatorParamList = {
  Dashboard: undefined;
  Goals: undefined;
  Coach: undefined;
  Budget: undefined;
  Reports: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

// Icon components defined outside render
const DashboardIcon = ({ focused }: { focused: boolean }) => (
  <Text style={focused ? tabStyles.iconFocused : tabStyles.iconUnfocused}>
    🏠
  </Text>
);

const GoalsIcon = ({ focused }: { focused: boolean }) => (
  <Text style={focused ? tabStyles.iconFocused : tabStyles.iconUnfocused}>
    🎯
  </Text>
);

const CoachIcon = ({ focused }: { focused: boolean }) => (
  <Text style={focused ? tabStyles.iconFocused : tabStyles.iconUnfocused}>
    🤖
  </Text>
);

const BudgetIcon = ({ focused }: { focused: boolean }) => (
  <Text style={focused ? tabStyles.iconFocused : tabStyles.iconUnfocused}>
    📊
  </Text>
);

const ReportsIcon = ({ focused }: { focused: boolean }) => (
  <Text style={focused ? tabStyles.iconFocused : tabStyles.iconUnfocused}>
    📈
  </Text>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: DashboardIcon,
        }}
      />
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen}
        options={{
          tabBarLabel: 'Metas',
          tabBarIcon: GoalsIcon,
        }}
      />
      <Tab.Screen 
        name="Coach" 
        component={AICoachScreen}
        options={{
          tabBarLabel: 'Coach IA',
          tabBarIcon: CoachIcon,
        }}
      />
      <Tab.Screen 
        name="Budget" 
        component={BudgetScreen}
        options={{
          tabBarLabel: 'Presupuesto',
          tabBarIcon: BudgetIcon,
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reportes',
          tabBarIcon: ReportsIcon,
        }}
      />
    </Tab.Navigator>
  );
}