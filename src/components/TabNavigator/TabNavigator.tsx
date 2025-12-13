import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IoniconsIcon from '@react-native-vector-icons/ionicons';
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
const DashboardIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <IoniconsIcon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
);

const GoalsIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <IoniconsIcon name={focused ? 'flag' : 'flag-outline'} size={24} color={color} />
);

const CoachIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <IoniconsIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
);

const BudgetIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <IoniconsIcon name={focused ? 'wallet' : 'wallet-outline'} size={24} color={color} />
);

const ReportsIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <IoniconsIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} color={color} />
);

export default function TabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAFFF2' }} edges={["bottom","left","right"]}>
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
          tabBarActiveTintColor: '#00c66d',
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
    </SafeAreaView>
  );
}