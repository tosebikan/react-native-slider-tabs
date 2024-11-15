
import React, { useState, useEffect, FC } from 'react';
import {
    View, StyleSheet, Animated,
    TouchableOpacity,
    Text,
    Dimensions,
    TextStyle,
    ViewStyle,
} from 'react-native';

interface SliderTabsProps {
    tabs: string[];
    activeTab: number;
    onTabPress?: (index: number) => void;
    sliderTabWidth?: number;
    backgroundColor?: string;
    activeBackgroundColor?: string;
    textColor?: string;
    activeTextColor?: string;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    activeTitleStyle?: TextStyle;
    tabsOffset?: number;
    numberOfLines?: number;
  }

const { width } = Dimensions.get('window');

const SliderTabs:FC<SliderTabsProps> = ({
    tabs, 
    activeTab, 
    onTabPress, 
    sliderTabWidth,
    backgroundColor = '#F24405', 
    activeBackgroundColor = '#A60808',
    textColor = '#0D0003', 
    activeTextColor = '#ffffff',
    style, 
    titleStyle, 
    activeTitleStyle,
    tabsOffset = 0,
    numberOfLines
}) => {
    const [translateValue] = useState(new Animated.Value(0));
    const tabWidth = sliderTabWidth || (width / tabs.length) - 32;

    const animateSlider = (index: number) => {
        Animated.spring(translateValue, {
            toValue: index > 0 ? (index * tabWidth) + tabsOffset : index * tabWidth,
            velocity: 10,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animateSlider(activeTab);
    }, [activeTab, tabs]);

    return (
        <View style={[styles.container, style]}>
            <Animated.View
                style={[
                    styles.slider,
                    {
                        transform: [{ translateX: translateValue }],
                        width: tabWidth * 0.95,
                        backgroundColor: activeBackgroundColor,
                    },
                ]}
            />
            {!!tabs?.length
            && tabs.map((tab, index) => (
                <TouchableOpacity
                    key={`${tab}-${index}`}
                    style={[styles.tab, { width: tabWidth, marginRight: index === tabs.length - 1 ? 0 : tabsOffset }]}
                    onPress={()=> onTabPress && onTabPress(index)}
                >
                    <Text
                        style={[styles.title, { color: activeTab === index ? activeTextColor : textColor }, activeTab === index && activeTitleStyle, titleStyle]}
                        numberOfLines={numberOfLines}
                    >
                        {tab}
                    </Text>
                    <View style={[styles.bar, { backgroundColor }]} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SliderTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width - 32,
        alignSelf: 'center',
        height: 40,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        height: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderRadius: 18,
        width: '95%',
        alignSelf: 'center',
    },
    slider: {
        height: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignSelf: 'center',
        borderRadius: 18,
        zIndex: 99,
    },
    title: {
        fontSize: 12,
    },
    activeTitle:{

    }
});
