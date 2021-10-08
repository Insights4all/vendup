import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerComponent from './customDrawerComponent';
import CustomDrawerComponentVendor from './customDrawerComponentVendor';
import {connect} from 'react-redux';

// screens
import {
  Home,
  Login,
  Orders,
  Singup,
  ProductDetail,
  Checkout,
  OrderDetail,
  Cart,
} from '../screens';

import {
  VOrder,
  VHome,
  VProductDetail,
  VProducts,
  VCustomers,
  VOrderDetail,
  VAddProducts,
  VAddCustomer,
} from '../vendor/index';
import Profile from '../screens/profile/Profile';
import Product from '../screens/home/components/Product';

// Home stack screens
const HomeStack = createStackNavigator();
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

// cart stack screens
const CartStack = createStackNavigator();
const CartStackScreens = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <CartStack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
    </CartStack.Navigator>
  );
};

// Order stack screens
const OrderStack = createStackNavigator();
const OrderStackScreens = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
      <OrderStack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{headerShown: false}}
      />
    </OrderStack.Navigator>
  );
};

// bottom tab navigator
const Drawer = createDrawerNavigator();
const DrawerNavigation = (props) => {
  const rtl = false;
  // const rtl = props.rtlCustomer;
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      drawerPosition={'left'}>
      <Drawer.Screen name="Home" component={HomeStackScreens} />
      <Drawer.Screen name="Orders" component={OrderStackScreens} />
      <Drawer.Screen name="Cart" component={CartStackScreens} />
    </Drawer.Navigator>
  );
};

const DrawerRTL = createDrawerNavigator();
const DrawerRTLNavigation = (props) => {
  return (
    <DrawerRTL.Navigator
      initialRouteName="Login"
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      drawerPosition={'right'}>
      <DrawerRTL.Screen name="Home" component={HomeStackScreens} />
      <DrawerRTL.Screen name="Orders" component={OrderStackScreens} />
      <DrawerRTL.Screen name="Cart" component={CartStackScreens} />
    </DrawerRTL.Navigator>
  );
};

// Home stack screens
const VHomeStack = createStackNavigator();
const VHomeStackScreens = () => {
  return (
    <VHomeStack.Navigator>
      <VHomeStack.Screen
        name="VHome"
        component={VHome}
        options={{headerShown: false}}
      />
      <VHomeStack.Screen
        name="VProductDetail"
        component={VProductDetail}
        options={{headerShown: false}}
      />
    </VHomeStack.Navigator>
  );
};

// Order stack screens
const VOrderStack = createStackNavigator();
const VOrderStackScreens = () => {
  return (
    <VOrderStack.Navigator>
      <VOrderStack.Screen
        name="VOrder"
        component={VOrder}
        options={{headerShown: false}}
      />
      <VOrderStack.Screen
        name="VOrderDetail"
        component={VOrderDetail}
        options={{headerShown: false}}
      />
    </VOrderStack.Navigator>
  );
};

// VCustomers stack screens
const VCustomersStack = createStackNavigator();
const VCustomersStackScreens = () => {
  return (
    <VCustomersStack.Navigator>
      <VCustomersStack.Screen
        name="VCustomers"
        component={VCustomers}
        options={{headerShown: false}}
      />
      <VCustomersStack.Screen
        name="VAddCustomer"
        component={VAddCustomer}
        options={{headerShown: false}}
      />
    </VCustomersStack.Navigator>
  );
};

// VProducts stack screens
const VProductsStack = createStackNavigator();
const VProductsStackScreens = () => {
  return (
    <VProductsStack.Navigator>
      <VProductsStack.Screen
        name="VProducts"
        component={VProducts}
        options={{headerShown: false}}
      />
      <VProductsStack.Screen
        name="VAddProducts"
        component={VAddProducts}
        options={{headerShown: false}}
      />
    </VProductsStack.Navigator>
  );
};

const DrawerVendorRTL = createDrawerNavigator();
const DrawerVendorRTLNavigation = (props) => {
  return (
    <DrawerVendorRTL.Navigator
      initialRouteName="VOrder"
      drawerContent={(props) => <CustomDrawerComponentVendor {...props} />}
      drawerPosition={'right'}>
      <DrawerVendorRTL.Screen name="VOrder" component={VOrderStackScreens} />
      <DrawerVendorRTL.Screen name="VHome" component={VHomeStackScreens} />
      <DrawerVendorRTL.Screen
        name="VProducts"
        component={VProductsStackScreens}
      />
      <DrawerVendorRTL.Screen name="VAddProducts" component={VAddProducts} />
      <DrawerVendorRTL.Screen
        name="VCustomers"
        component={VCustomersStackScreens}
      />
    </DrawerVendorRTL.Navigator>
  );
};
const DrawerVendor = createDrawerNavigator();
const DrawerVendorNavigation = (props) => {
  return (
    <DrawerVendor.Navigator
      initialRouteName="VOrder"
      drawerContent={(props) => <CustomDrawerComponentVendor {...props} />}
      drawerPosition={'left'}>
      <DrawerVendor.Screen name="VOrder" component={VOrderStackScreens} />
      <DrawerVendor.Screen name="VHome" component={VHomeStackScreens} />
      <DrawerVendor.Screen name="VProducts" component={VProductsStackScreens} />
      <DrawerVendor.Screen name="VAddProducts" component={VAddProducts} />
      <DrawerVendor.Screen
        name="VCustomers"
        component={VCustomersStackScreens}
      />
    </DrawerVendor.Navigator>
  );
};
// Root Navigation
const Stack = createStackNavigator();
const RootNavigation = (props) => {
  return (
    <NavigationContainer>
      {props.isLogin ? (
        <>
          {props.role === 'VENDOR' ? (
            props.rtlVendor ? (
              <DrawerVendorRTLNavigation />
            ) : (
              <DrawerVendorNavigation />
            )
          ) : props.rtlCustomer ? (
            <DrawerRTLNavigation />
          ) : (
            <DrawerNavigation />
          )}
        </>
      ) : (
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

function mapStateToProps(state) {
  return {
    role: state.auth.role,
    isLogin: state.auth.isLogin,
    rtlVendor: state.theme.rtlVendor,
    rtlCustomer: state.theme.rtlCustomer,
  };
}

export default connect(mapStateToProps, {})(RootNavigation);
