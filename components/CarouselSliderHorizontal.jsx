import { StyleSheet, View, ScrollView } from "react-native";

export const CarouselSliderHorizontal = (props) => {
    const styles = StyleSheet.create({
        sliderScrollWrap: {
            flexDirection: 'row',
            gap: 10
        }
    });

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flexGrow: 0 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.sliderScrollWrap}>
                    {props.children}
                </View>
            </ScrollView>
        </View>
    )
}